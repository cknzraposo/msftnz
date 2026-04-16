# 10 – Optional: Foundry Local (On-Device AI)

Foundry Local lets you run AI models entirely on your own device — no Azure subscription, no internet connection, and no per-token costs. Your data never leaves your machine.

This guide shows you how to install Foundry Local, run a model locally, and call it from Python using the same OpenAI SDK patterns you learned in [07 – Microsoft Foundry](07-azure-ai-foundry.md).

---

## Why Use Foundry Local?

| Benefit | Detail |
| --- | --- |
| **No cloud dependency** | Run models offline or in limited-connectivity environments |
| **Data stays on device** | Prompts and outputs are processed locally — ideal for sensitive data |
| **Zero cost per token** | No Azure subscription or API billing required |
| **Low latency** | No network round-trip — responses start immediately |
| **Same SDK** | Uses an OpenAI-compatible API, so your existing code works with minimal changes |

> **💡 Hackathon tip:** Foundry Local is useful for rapid prototyping without consuming your team's Azure token quota. You can develop and test prompt logic locally, then switch to cloud models for the final demo.

---

## Cloud vs. Local — When to Use Which

| | Microsoft Foundry (Cloud) | Foundry Local (On-Device) |
| --- | --- | --- |
| **Where it runs** | Azure data centres | Your laptop/desktop |
| **Models** | Full Azure model catalog (GPT-4o, etc.) | Curated on-device catalog (Phi, DeepSeek, Qwen, Mistral, Whisper) |
| **Azure subscription** | Required | Not required |
| **Internet** | Required | Not required (after initial model download) |
| **Cost** | Per-token billing | Free |
| **Best for** | Production workloads, large models, agent orchestration | Prototyping, offline development, privacy-sensitive scenarios |
| **SDK** | OpenAI SDK | OpenAI SDK (same code, different endpoint) |

---

## System Requirements

- **OS:** Windows 10/11, macOS (Apple Silicon), or Linux
- **RAM:** 8 GB minimum (16 GB recommended for larger models)
- **Disk:** 2–10 GB per model depending on size
- **GPU:** Optional — Foundry Local auto-detects GPUs and NPUs for acceleration, falls back to CPU

> **💡 Tip:** If your laptop has limited RAM, start with smaller models like Phi. Foundry Local selects the best-performing variant for your hardware automatically.

---

## Step 1 – Install Foundry Local

### Windows (PowerShell)

```powershell
winget install Microsoft.FoundryLocal
```

### macOS (Homebrew)

```bash
brew install foundry-local
```

### Linux

```bash
curl -fsSL https://aka.ms/foundry-local-install | bash
```

**Verify the installation:**

```bash
foundry local --version
# Expected output: foundry-local x.x.x
```

📖 Reference: [Get started with Foundry Local](https://learn.microsoft.com/en-us/azure/foundry-local/get-started)

---

## Step 2 – Browse Available Models

List the models available in the curated catalog:

```bash
foundry model list
```

Key model families:

| Family | Type | Good for |
| --- | --- | --- |
| **Phi** | Chat completions | Lightweight general-purpose chat, constrained hardware |
| **DeepSeek** | Chat completions | Reasoning and code tasks |
| **Qwen** | Chat completions | Multilingual chat |
| **Mistral** | Chat completions | Fast general-purpose chat |
| **Whisper** | Audio transcription | Speech-to-text |

---

## Step 3 – Run a Model

Download and start a model (first run downloads the model files):

```bash
foundry model run phi-4-mini
```

Foundry Local will:

1. Download the model (cached for future use)
2. Detect your hardware (GPU/NPU/CPU)
3. Start an OpenAI-compatible local server

Once running, you will see the local endpoint URL (typically `http://localhost:5273`).

> **💡 Tip:** The first run takes longer due to the model download. Subsequent starts are near-instant from cache.

---

## Step 4 – Call from Python

Since Foundry Local exposes an OpenAI-compatible API, you can use the same `openai` package from guide 07.

Install dependencies (if not already installed):

```bash
pip install openai
```

### Example — chat with a local model

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:5273/v1",
    api_key="not-needed",  # Foundry Local does not require an API key
)

response = client.chat.completions.create(
    model="phi-4-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is Foundry Local?"},
    ],
)

print(response.choices[0].message.content)
```

> Notice: the only differences from the cloud code in guide 07 are the `base_url` (localhost instead of Azure) and `api_key` (not required). The rest of the OpenAI SDK usage is identical.

---

## Step 5 – Switch Between Local and Cloud

A practical pattern is to use environment variables so the same code works with both Foundry Local and cloud:

```python
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url=os.getenv("OPENAI_BASE_URL", "http://localhost:5273/v1"),
    api_key=os.getenv("OPENAI_API_KEY", "not-needed"),
)

response = client.chat.completions.create(
    model=os.getenv("MODEL_NAME", "phi-4-mini"),
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Summarise the key points of data sovereignty."},
    ],
)

print(response.choices[0].message.content)
```

- **Local development:** Leave `.env` empty or unset — defaults to Foundry Local
- **Cloud deployment:** Set `OPENAI_BASE_URL`, `OPENAI_API_KEY`, and `MODEL_NAME` to your Azure values

---

## References (Official Microsoft)

- [What is Foundry Local?](https://learn.microsoft.com/en-us/azure/foundry-local/what-is-foundry-local)
- [Get started with Foundry Local](https://learn.microsoft.com/en-us/azure/foundry-local/get-started)
- [Foundry Local architecture](https://learn.microsoft.com/en-us/azure/foundry-local/concepts/foundry-local-architecture)
- [Foundry Local SDK reference](https://learn.microsoft.com/en-us/azure/foundry-local/reference/reference-sdk-current)
- [Integrate with inference SDKs](https://learn.microsoft.com/en-us/azure/foundry-local/how-to/how-to-integrate-with-inference-sdks)

---

## ✅ Checkpoint

Before moving on, confirm:

- [ ] `foundry local --version` runs without errors
- [ ] You can list available models with `foundry model list`
- [ ] You can run a model locally and see the endpoint URL
- [ ] You can call the local model from Python using the `openai` SDK
- [ ] You understand the difference between Foundry Local and cloud-based Microsoft Foundry

---

## ➡️ Next Step

Return to [Using the UoA Azure Environment](using-uoa-azure.md) if your team's environment has been provisioned, or explore the [Use Cases](use-cases/clinical-assessment-digitisation-agent.md) to start building.

---

## Disclaimer

*The opinions expressed herein are my own personal opinions and do not represent my employer's view in any way. Presentation Resources are provided as is with no guarantees or warranties of any kind.*

Installation commands and model availability may change. Re-verify official Microsoft documentation for the latest instructions.
