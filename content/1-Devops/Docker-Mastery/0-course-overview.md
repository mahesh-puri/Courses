---
title: "0. Course Overview and Index"
draft: false
---

This course builds a **practical mental model of Docker** from first principles
and then connects it to real-world DevOps workflows.

Each section below links to a focused module that you can study and practice
independently.

---

## 1. Docker Images – How the Lego Bricks of Containers Really Work

👉 [Go to: Docker Images](./1-docker-images/)

**You will learn:**

1. Image vs container vs registry
   - Image as an immutable blueprint
   - Container as a running process plus writable layer
   - Registry as a Git-like store for built images

2. Layered filesystems and why each instruction matters
   - How every Dockerfile instruction creates a new layer
   - Why `RUN apt-get update && apt-get install ...` vs multiple `RUN`s changes cache behavior
   - Refactoring a bad Dockerfile into a cache-friendly one

3. Build, tag, and push workflow
   - Mental model of `docker build`: context → Dockerfile → layers
   - Semantic tagging strategy (`1.0.0`, `1.0.0-prod`, `latest`)
   - End-to-end flow from local build to private registry

4. Inspecting and understanding images
   - Using `docker inspect` and `docker history`
   - Detecting bloated layers
   - Comparing `openjdk`, `temurin`, and `distroless`

5. Cleaning up images
   - Dangling images and safe pruning
   - When and how to use `docker image prune`

6. Practical best practices
   - Small base images
   - Deterministic Dockerfiles
   - No secrets in images

---

## 2. Containers – Processes, Not Tiny VMs

👉 [Go to: Docker Containers](./2-docker-containers/)

**You will learn:**

1. Container = process + isolation
2. Container lifecycle (create → start → stop → remove)
3. Real-world `docker run` usage
4. Logs, exec, inspect, and stats
5. CPU and memory limits
6. Practical rules of thumb

---

## 3. Docker Networking – Making Containers Talk Like Grown-Ups

👉 [Go to: Docker Networking](./3-docker-networking/)

**You will learn:**

1. Network namespaces and bridges
2. Built-in Docker network drivers
3. User-defined bridges and DNS
4. Port publishing vs internal ports
5. Debugging connectivity issues
6. Mapping Docker networking to Kubernetes

---

## 4. Volumes – Keeping Data Alive When Containers Die

👉 [Go to: Docker Volumes](./4-docker-volumes/)

**You will learn:**

1. Ephemeral container filesystems
2. Named volumes vs bind mounts vs tmpfs
3. Persistent databases in Docker
4. Bind mounts for development
5. Volume inspection and backups
6. Production storage rules

---

## 5. Dockerfile Instructions – Writing Dockerfiles Like an Engineer

👉 [Go to: Dockerfile Mastery](./5-dockerfile-mastery/)

**You will learn:**

1. Dockerfile as a deterministic build recipe
2. Core instructions and intent
3. COPY vs ADD
4. ENV vs ARG
5. CMD vs ENTRYPOINT
6. Security-aware Dockerfiles
7. Refactoring bad Dockerfiles

---

## 6. Multi-Stage Builds – Shrinking Images and Attack Surface

👉 [Go to: Multi-Stage Docker Builds](./6-multi-stage-docker-builds/)

**You will learn:**

1. Why single-stage images are dangerous
2. Build vs runtime separation
3. Node, Java, and Go examples
4. Cache optimization
5. Security benefits
6. Migrating legacy Dockerfiles

---

## 7. Docker Security – Baseline Guardrails for Devs and DevOps

👉 [Go to: Docker Security Essentials](./7-docker-security-essentials/)

**You will learn:**

1. Container threat model
2. Non-root users
3. Capabilities and seccomp
4. Image hygiene
5. Runtime hardening flags
6. Secrets handling

---

## 8. Registries and Tagging – Versioning Containers Like Real Software

👉 [Go to: Docker Registries & Tagging](./8-docker-registries-and-tagging/)

**You will learn:**

1. Registries as artifact repositories
2. Tagging strategies that scale
3. CI/CD image workflows
4. Image promotion across environments
5. Authentication and access control

---

## 9. Docker Compose – Local Microservices Without Losing Your Mind

👉 [Go to: Docker Compose](./9-docker-compose/)

**You will learn:**

1. Why Compose exists
2. Services, networks, and volumes
3. Multi-service local stacks
4. Developer workflows
5. Best practices
6. Bridge to Kubernetes

---

## 10. Troubleshooting and Debugging – A Systematic Playbook

👉 [Go to: Debugging Docker](./10-debugging-docker/)

**You will learn:**

1. Debugging mindset
2. Containers that won’t start
3. Apps not reachable
4. Inter-container connectivity issues
5. Performance and OOM debugging
6. Building a reusable debug SOP

---

## 11. Orchestration Hooks – From Docker to Kubernetes

👉 [Go to: From Docker to Orchestrators](./11-from-docker-to-orchestrators/)

**You will learn:**

1. Why Docker alone isn’t enough
2. Docker → Kubernetes mental model mapping
3. Swarm overview
4. Image and rollout considerations in k8s
5. Migration path from Compose to Kubernetes

---

[← Back to Docker Mastery](../../1-Devops/Docker-Mastery/)  
[← Back to DevOps Track](../../1-Devops/)  
[← Back to Courses Home](../../)
