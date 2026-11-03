export const projects = [
  {
    "slug": "aeronode",
    "name": "AeroNode",
    "status": "Experimental MVP",
    "summary": "Adaptive inference measured against full-depth execution.",
    "metrics": [
      "2.1052 ms vs 2.8139 ms"
    ],
    "tags": [
      "C++17",
      "ONNX Runtime"
    ],
    "repoUrl": "https://github.com/abhishekkr10/AeroNode" as string | null,
    "proofFolder": "/proof/aeronode",
    "limitation": "Windows x64 is the verified native platform.",
    "snippets": [
      {
        "path": "runtime/include/exit_decision.hpp",
        "url": "https://github.com/abhishekkr10/AeroNode/blob/b9c914ab850c8183b0777ee677ca49d05a102844/runtime/include/exit_decision.hpp#L77-L84",
        "code": "  ExitEvaluation EvaluateStage(const PredictionMetrics& metrics, int exit_index,\n                               const RuntimeState& state, double elapsed_ms = 0.0) const {\n    if (exit_index < 1 || exit_index > 4) {\n      throw std::invalid_argument(\"EvaluateStage requires exit_index in [1, 4]\");\n    }\n    return EvaluateAt(metrics, static_cast<std::size_t>(exit_index - 1),\n                      exit_index == 4, state, elapsed_ms);\n  }",
        "description": "Evaluate one stage without treating an intermediate head as the final exit."
      }
    ],
    "caseStudy": {
      "kicker": "Adaptive inference",
      "stages": [
        "Input tensor",
        "Staged execution",
        "Entropy decision",
        "Early exit"
      ],
      "notes": [
        "Confidence-based inference depth",
        "Recorded adaptive and full-depth comparison"
      ]
    }
  },
  {
    "slug": "jocky",
    "name": "JOCKY",
    "status": "Working local platform",
    "summary": "Compile investigations, correlate evidence and verify signed checkpoints.",
    "metrics": [],
    "tags": [
      "Rust",
      "FastAPI",
      "React"
    ],
    "repoUrl": "https://github.com/abhishekkr10/jocky-forensics" as string | null,
    "proofFolder": "/proof/jocky",
    "limitation": "See the source README for prototype limits.",
    "snippets": [
      {
        "path": "crates/jocky-runtime/src/lib.rs",
        "url": "https://github.com/abhishekkr10/jocky-forensics/blob/0d66c13259972fea4f35f6a395a72fa18ff1f861/crates/jocky-runtime/src/lib.rs#L4-L15",
        "code": "pub fn verify_job(request:&Value,plan:&Plan)->Result<(),String>{\n let trusted=std::env::var(\"JOCKY_AGENT_PUBLIC_KEY\").map_err(|_|\"Agent trust key is not configured\")?;\n let raw=hex::decode(trusted).map_err(|_|\"Invalid trust key\")?;\n let key=VerifyingKey::from_bytes(&raw.try_into().map_err(|_|\"Invalid key length\")?).map_err(|e|e.to_string())?;\n let job=&request[\"signed_job\"];let body=&job[\"body\"];\n let sig=hex::decode(job[\"signature\"].as_str().ok_or(\"Missing job signature\")?).map_err(|e|e.to_string())?;\n key.verify(&jocky_ir::canonical(body),&Signature::from_slice(&sig).map_err(|e|e.to_string())?).map_err(|_|\"Invalid job signature\")?;\n let now=std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map_err(|e|e.to_string())?.as_secs();\n if body[\"expires_at\"].as_u64().unwrap_or(0)<now || body[\"issued_at\"].as_u64().unwrap_or(u64::MAX)>now+30{return Err(\"Expired or future job\".into())}\n if body[\"plan_digest\"]!=jocky_ir::digest(plan)||body[\"operation_id\"]!=request[\"operation_id\"]||body[\"approved_root\"]!=request[\"approved_root\"]{return Err(\"Signed job binding mismatch\".into())}\n Ok(())\n}",
        "description": "Verify the job signature, validity window and binding to the approved investigation plan."
      }
    ],
    "caseStudy": {
      "kicker": "Defensive forensics",
      "stages": [
        "Artifact collection",
        "Intermediate representation",
        "Analysis + correlation",
        "Signed checkpoint"
      ],
      "notes": [
        "Read-oriented defensive investigation",
        "Public demonstration uses synthetic evidence"
      ]
    }
  },
  {
    "slug": "safetrack",
    "name": "SafeTrack",
    "status": "IoT prototype",
    "summary": "Signed shipment sensor events with a hash-linked evidence trail.",
    "metrics": [],
    "tags": [
      "ESP32-S3",
      "FastAPI",
      "PostgreSQL"
    ],
    "repoUrl": "https://github.com/inamansingh2401/tamperproject" as string | null,
    "proofFolder": "/proof/safetrack",
    "limitation": "See the source README for prototype limits.",
    "snippets": [
      {
        "path": "tracksure_final_code.ino",
        "url": "https://github.com/inamansingh2401/tamperproject/blob/3d01e781aded0ad8a79c40bf235379dfee726bf7/tracksure_final_code.ino#L111-L136",
        "code": "void relayTask(void*) {\n    OutgoingRecord record;\n    String reply;\n    for (;;) {\n        if (xQueueReceive(outgoing, &record, portMAX_DELAY) != pdTRUE) continue;\n        bool acknowledged = false;\n        while (!acknowledged) {\n            Serial.print(\"TRACKSURE \");\n            Serial.println(record.data);\n            unsigned long began = millis();\n            while (millis() - began < 2500) {\n                while (Serial.available()) {\n                    char ch = Serial.read();\n                    if (ch == '\\n') {\n                        reply.trim();\n                        if (reply == String(\"ACK \") + record.id) acknowledged = true;\n                        reply = \"\";\n                    } else if (reply.length() < 150) reply += ch;\n                    else reply = \"\";\n                }\n                if (acknowledged) break;\n                vTaskDelay(pdMS_TO_TICKS(10));\n            }\n        }\n    }\n}",
        "description": "Keep serial upload and acknowledgement retries in a dedicated task, outside sensor sampling."
      }
    ],
    "caseStudy": {
      "kicker": "Trusted telemetry",
      "stages": [
        "Sense",
        "Sign",
        "Gateway + outbox",
        "Verify + retain"
      ],
      "notes": [
        "Team project: device-to-dashboard telemetry",
        "ATECC508A event signatures and a hash-linked ledger"
      ]
    }
  },
  {
    "slug": "causalbench",
    "name": "CausalBench",
    "status": "Local lab \u00b7 simulated actuator",
    "summary": "Generate or import timestamped traces, inject repeatable faults, replay decisions, investigate disagreements, minimize failures and preserve reproducible evidence.",
    "metrics": [
      "93 Python tests; 13 browser workflows (README)"
    ],
    "tags": [
      "Python",
      "SQLite",
      "C++"
    ],
    "repoUrl": "https://github.com/abhishekkr10/CausalBench" as string | null,
    "proofFolder": "/proof/causalbench",
    "limitation": "Simulated actuation; hardware optional.",
    "snippets": [
      {
        "path": "controllers/native_guarded.cpp",
        "url": "https://github.com/abhishekkr10/CausalBench/blob/4dc7ea1cf636291666c68846d0efcba64a5723cc/controllers/native_guarded.cpp#L5-L25",
        "code": "int main() {\n    long long enter, exit, ageLimit;\n    if (!(std::cin >> enter >> exit >> ageLimit)) return 1;\n    long long now, id, sample, distance, present, latest=-1;\n    bool active=false;\n    std::set<long long> seen;\n    while(std::cin >> now >> id >> sample >> distance >> present) {\n        std::string reason=\"accepted\";\n        bool pulse=false;\n        if(!present) reason=\"missing\";\n        else if(distance<0) reason=\"invalid\";\n        else if(seen.count(id)) reason=\"duplicate\";\n        else if(now-sample>ageLimit) reason=\"stale\";\n        else if(sample<=latest) reason=\"order\";\n        else {pulse=distance<(active?exit:enter); latest=sample;}\n        if(present) seen.insert(id);\n        active=pulse;\n        std::cout << (pulse?\"PULSE\":\"HOLD\") << ' ' << reason << '\\n';\n    }\n    return 0;\n}",
        "description": "Reject missing, invalid, duplicate, stale and out-of-order samples before a simulated pulse."
      }
    ],
    "caseStudy": {
      "kicker": "Control validation",
      "stages": [
        "Sensor trace",
        "Inject faults",
        "Compare decisions",
        "Minimize + regress"
      ],
      "notes": [
        "Repeatable faults and reproducible evidence",
        "Simulated actuation; hardware optional"
      ]
    }
  }
] as const
