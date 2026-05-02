---
title: "Day 07 — File Transfer Commands in Linux"
description: "Learn scp and rsync for file transfer and synchronization in real DevOps workflows."
---

# Day 07 — File Transfer Commands in Linux

## 🎯 Goal

Understand how to **transfer and synchronize files across systems securely and efficiently** using Linux tools.

---

# 7️⃣ File Transfer — scp

```bash
scp file.txt user@server:/home/user/
```

### Explanation

scp securely copies files over SSH.

---

## Use Cases

- Deploy files to servers
- Copy logs
- Transfer configs

---

## Limitation

- Copies entire file every time
- Not efficient for large or repeated transfers

---

# 8️⃣ File Sync — rsync

```bash
rsync -avz folder/ user@server:/home/user/
```

### Explanation

rsync is a smart file transfer tool.

It:

- transfers only changed parts
- preserves permissions
- compresses data

---

## Why rsync is powerful

- efficient for large data
- supports incremental sync
- used in deployments and backups

---

## Example

```bash
rsync -avz --delete app/ user@server:/var/www/app/
```

Ensures destination mirrors source.

---

# 🧠 Key Insight

- scp = simple copy
- rsync = intelligent synchronization

---

# 🔟 Real DevOps Workflow

```bash
touch app.log
chmod 644 app.log
sudo chown user:devops app.log

scp app.log user@server:/var/log/
rsync -avz logs/ user@server:/var/log/app/
```

---

# 🧪 Practice Lab

```bash
ls -l
chmod 755 script.sh
chmod 644 file.txt

umask

sudo chown user file.txt
sudo chgrp devops file.txt

gzip file.txt
tar -czvf archive.tar.gz dir/

scp file.txt user@server:/tmp/
rsync -avz folder/ user@server:/tmp/
```

---

# 🧠 Key Takeaways

- Permissions define security boundaries
- chmod uses binary logic (4+2+1)
- umask controls default behavior
- ownership defines control
- tar & gzip are default tools
- zip may require installation
- scp copies, rsync syncs efficiently

---

# ✅ Outcome

You can now:

- Interpret and set permissions confidently
- Understand ownership deeply
- Control default file behavior
- Compress and archive files
- Transfer and sync data across systems

Next → Linux Networking Commands 🚀
