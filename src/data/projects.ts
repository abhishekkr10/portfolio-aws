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
    "repoUrl": "https://github.com/abhishekkr10/AeroNode",
    "proofFolder": "/proof/aeronode",
    "limitation": "Windows x64 is the verified native platform.",
    "snippets": [
      {
        "path": "runtime/src/staged_model_runner.cpp",
        "url": "https://github.com/abhishekkr10/AeroNode/blob/b9c914ab850c8183b0777ee677ca49d05a102844/runtime/src/staged_model_runner.cpp#L412-L430",
        "code": "    trace.output_shapes.reserve(outputs.size());\n    trace.sample_evaluations.reserve(static_cast<std::size_t>(shape[0]));\n    for (const auto& output : outputs) trace.output_shapes.push_back(output.GetTensorTypeAndShapeInfo().GetShape());\n    const auto& logits_tensor = outputs.back();\n    const float* logits = logits_tensor.GetTensorData<float>();\n    const double elapsed_ms = std::chrono::duration<double, std::milli>(\n        std::chrono::steady_clock::now() - start).count();\n    bool all_exit = true;\n    for (std::int64_t sample = 0; sample < shape[0]; ++sample) {\n      const auto metrics = ComputePredictionMetrics(logits + static_cast<std::size_t>(sample) * 10, 10);\n      if (!std::isfinite(metrics.entropy) || !std::isfinite(metrics.confidence)) {\n        throw std::runtime_error(\"Non-finite prediction metrics in stage_\" + std::to_string(stage + 1));\n      }\n      trace.sample_evaluations.push_back(policy.EvaluateStage(metrics, trace.stage_index, state, elapsed_ms));\n      all_exit = all_exit && trace.sample_evaluations.back().exited;\n    }\n    if (all_exit) {\n      result.selected_exit = trace.stage_index;\n      result.output_shape = trace.output_shapes.back();"
      }
    ]
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
    "repoUrl": "https://github.com/abhishekkr10/jocky-forensics",
    "proofFolder": "/proof/jocky",
    "limitation": "See the source README for prototype limits.",
    "snippets": [
      {
        "path": "crates/jocky-runtime/src/lib.rs",
        "url": "https://github.com/abhishekkr10/jocky-forensics/blob/0d66c13259972fea4f35f6a395a72fa18ff1f861/crates/jocky-runtime/src/lib.rs#L4-L15",
        "code": "pub fn verify_job(request:&Value,plan:&Plan)->Result<(),String>{\n let trusted=std::env::var(\"JOCKY_AGENT_PUBLIC_KEY\").map_err(|_|\"Agent trust key is not configured\")?;\n let raw=hex::decode(trusted).map_err(|_|\"Invalid trust key\")?;\n let key=VerifyingKey::from_bytes(&raw.try_into().map_err(|_|\"Invalid key length\")?).map_err(|e|e.to_string())?;\n let job=&request[\"signed_job\"];let body=&job[\"body\"];\n let sig=hex::decode(job[\"signature\"].as_str().ok_or(\"Missing job signature\")?).map_err(|e|e.to_string())?;\n key.verify(&jocky_ir::canonical(body),&Signature::from_slice(&sig).map_err(|e|e.to_string())?).map_err(|_|\"Invalid job signature\")?;\n let now=std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map_err(|e|e.to_string())?.as_secs();\n if body[\"expires_at\"].as_u64().unwrap_or(0)<now || body[\"issued_at\"].as_u64().unwrap_or(u64::MAX)>now+30{return Err(\"Expired or future job\".into())}\n if body[\"plan_digest\"]!=jocky_ir::digest(plan)||body[\"operation_id\"]!=request[\"operation_id\"]||body[\"approved_root\"]!=request[\"approved_root\"]{return Err(\"Signed job binding mismatch\".into())}\n Ok(())\n}"
      }
    ]
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
    "repoUrl": "https://github.com/inamansingh2401/tamperproject",
    "proofFolder": "/proof/safetrack",
    "limitation": "See the source README for prototype limits.",
    "snippets": [
      {
        "path": "tracksure_final_code.ino",
        "url": "https://github.com/inamansingh2401/tamperproject/blob/3d01e781aded0ad8a79c40bf235379dfee726bf7/tracksure_final_code.ino#L115-L126",
        "code": "        if (xQueueReceive(outgoing, &record, portMAX_DELAY) != pdTRUE) continue;\n        bool acknowledged = false;\n        while (!acknowledged) {\n            Serial.print(\"TRACKSURE \");\n            Serial.println(record.data);\n            unsigned long began = millis();\n            while (millis() - began < 2500) {\n                while (Serial.available()) {\n                    char ch = Serial.read();\n                    if (ch == '\\n') {\n                        reply.trim();\n                        if (reply == String(\"ACK \") + record.id) acknowledged = true;"
      }
    ]
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
    "repoUrl": "https://github.com/abhishekkr10/CausalBench",
    "proofFolder": "/proof/causalbench",
    "limitation": "Simulated actuation; hardware optional.",
    "snippets": [
      {
        "path": "controllers/native_guarded.cpp",
        "url": "https://github.com/abhishekkr10/CausalBench/blob/4dc7ea1cf636291666c68846d0efcba64a5723cc/controllers/native_guarded.cpp#L7-L18",
        "code": "    if (!(std::cin >> enter >> exit >> ageLimit)) return 1;\n    long long now, id, sample, distance, present, latest=-1;\n    bool active=false;\n    std::set<long long> seen;\n    while(std::cin >> now >> id >> sample >> distance >> present) {\n        std::string reason=\"accepted\";\n        bool pulse=false;\n        if(!present) reason=\"missing\";\n        else if(distance<0) reason=\"invalid\";\n        else if(seen.count(id)) reason=\"duplicate\";\n        else if(now-sample>ageLimit) reason=\"stale\";\n        else if(sample<=latest) reason=\"order\";"
      }
    ]
  }
] as const
