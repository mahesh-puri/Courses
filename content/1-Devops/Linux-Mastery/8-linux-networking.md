---
title: "Day 08 — Networking Commands in Linux"
description: "Deep, practical understanding of Linux networking commands for debugging real-world systems."
---

# Day 08 — Networking Commands in Linux

## 🎯 Goal

Build a deep, practical understanding of how to **debug networking issues in real systems** using Linux tools.

In production, most failures are networking-related:

- Service not reachable
- DNS issues
- Port not open
- Latency / packet loss

This chapter gives you the tools to **systematically diagnose them**.

---

# 🧠 Mental Model

Networking issues can be broken into layers:

```
DNS → IP → Routing → Port → Application
```

Each command helps debug one layer of this chain.

---

# 1️⃣ Connectivity — `ping`

```bash
ping google.com
ping -c 4 google.com
ping -i 2 google.com
```

### Explanation

ping sends ICMP echo requests to a remote host to check basic network connectivity.

It answers:

- Is the host reachable?
- How long does it take (latency)?

---

## Use cases

- Check if server is alive
- Validate DNS resolution
- Detect packet loss

---

## Important notes

- Some servers block ICMP → ping may fail even if server is up
- Use as a first-level diagnostic, not final truth

---

# 2️⃣ IP & Interfaces — ip, ifconfig, hostname, iwconfig

## ip (Modern tool)

```bash
ip addr
ip link
ip route
ip neigh
```

### Explanation

ip is the modern unified networking tool.

- ip addr → shows IP addresses
- ip link → shows interfaces (up/down)
- ip route → routing table
- ip neigh → ARP table

---

## Use cases

- Check server IP
- Debug routing issues
- Verify interface status

---

## ifconfig (Legacy)

```bash
ifconfig
ifconfig eth0
```

### Explanation

Older tool for interface configuration.

⚠️ Not installed by default.

---

## hostname

```bash
hostname
hostname -I
```

### Explanation

- Shows system hostname
- `-I` → shows IP addresses

---

## iwconfig

```bash
iwconfig
```

### Explanation

Used for wireless (Wi-Fi) configuration.

---

# 3️⃣ DNS Debugging — nslookup, dig, whois

## nslookup

```bash
nslookup google.com
nslookup google.com 8.8.8.8
```

### Explanation

Queries DNS to resolve domain → IP.

---

## dig (Preferred)

```bash
dig google.com
dig google.com +short
dig google.com @8.8.8.8
```

### Explanation

Advanced DNS tool showing:

- query time
- DNS server used
- record details

---

## Use cases

- Debug DNS issues
- Verify DNS propagation

---

## whois

```bash
whois google.com
```

### Explanation

Shows domain ownership and registration info.

---

# 4️⃣ Path & Routing — traceroute, tracepath, mtr

## traceroute

```bash
traceroute google.com
traceroute -n google.com
```

### Explanation

Shows path packets take across networks (hops).

---

## tracepath

```bash
tracepath google.com
```

### Explanation

Simpler alternative to traceroute.

---

## mtr (Best tool)

```bash
mtr google.com
mtr -c 10 google.com
```

### Explanation

Combines ping + traceroute in real-time.

---

## Use cases

- Detect packet loss
- Identify slow hops

---

# 5️⃣ Ports & Services — ss, netstat, nc, telnet

## ss (Modern)

```bash
ss -tulnp
ss -tn
ss -l
```

### Explanation

Shows:

- listening ports
- active connections

---

## netstat (Legacy)

```bash
netstat -tulnp
```

Replaced by ss.

---

## nc (Netcat)

```bash
nc -zv localhost 80
nc -zv google.com 443
```

### Explanation

Tests if a port is open.

---

## Use cases

- Debug API availability
- Check service ports

---

## telnet

```bash
telnet google.com 80
```

### Explanation

Manual connection tool (older).

---

# 6️⃣ ARP — arp

```bash
arp -a
```

### Explanation

Maps IP → MAC addresses.

Used in local network debugging.

---

# 7️⃣ Routing Table — route, ip route

```bash
route -n
ip route
```

### Explanation

Shows how packets are routed.

---

# 8️⃣ Monitoring & Utilities — watch, wget, curl

## watch

```bash
watch -n 1 "ss -tulnp"
```

### Explanation

Runs command repeatedly.

---

## wget

```bash
wget http://example.com/file.zip
wget -c file.zip
```

### Explanation

Downloads files.

---

## curl

```bash
curl http://example.com
curl -I http://example.com
curl -X POST http://api
```

### Explanation

Sends HTTP requests.

---

## Use cases

- API testing
- debugging endpoints

---

## curl vs wget

| Feature        | curl | wget |
| -------------- | ---- | ---- |
| API testing    | ✅   | ❌   |
| Download files | ❌   | ✅   |

---

# JSON Processing — jq (Very Important)

## Install (if not present)

```bash
sudo apt install jq
```

---

## Basic Usage

```bash
curl https://api.github.com | jq
```

### Explanation

jq formats and parses JSON data.

Without jq:

- JSON is hard to read

With jq:

- structured and readable

---

## Extract fields

```bash
curl https://api.github.com | jq '.current_user_url'
```

---

## Nested fields

```bash
curl https://api.github.com/repos/nodejs/node | jq '.owner.login'
```

---

## Arrays

```bash
curl https://api.github.com/repos/nodejs/node/contributors | jq '.[0].login'
```

---

## Pretty print JSON

```bash
cat file.json | jq
```

---

## Why jq matters

Modern systems:

- APIs return JSON
- Logs often JSON
- Kubernetes outputs JSON

👉 jq lets you filter, extract, transform data instantly

---

# 9️⃣ Network Scanning — nmap

```bash
nmap localhost
nmap -p 80,443 localhost
```

### Explanation

Scans open ports and services.

---

# 🔟 Firewall — iptables

```bash
sudo iptables -L
```

### Explanation

Controls inbound/outbound traffic.

---

# 🧪 Day-8 Lab

```bash
ping -c 4 google.com

ip addr
ip route

dig google.com +short
nslookup google.com

ss -tulnp
nc -zv localhost 80

traceroute google.com
mtr google.com

curl -I http://example.com
wget http://example.com/file.zip

nmap localhost
sudo iptables -L
```

---

# 🧠 Key Takeaways

- Networking debugging is layered
- ip, ss, dig are modern tools
- nc replaces telnet
- mtr is best for diagnosing network issues
- curl is essential for APIs

---

# ✅ Outcome

You can now:

- Debug connectivity issues
- Analyze DNS problems
- Inspect ports and services
- Trace network paths
- Test APIs and endpoints
- Diagnose real production issues

Next → Pro CLI Tools (AWK, GREP, FIND, SED) 🚀
