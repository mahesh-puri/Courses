---
title: "Day 04 — Linux Basic Commands for DevOps Engineers"
description: "Master essential Linux commands with deep understanding, examples, and real-world usage."
---

# Day 04 — Linux Basic Commands for DevOps Engineers

## 🎯 Goal

Build strong command-line fundamentals to **navigate systems, inspect files, and operate Linux servers confidently**.

These are the commands you will use **every single day in DevOps and backend engineering**.

---

# 🧠 Mental Model

Linux CLI is your **API to the OS**.

```
Commands → Combined → Solve real problems
```

Each command:

- Does one thing well
- Can be combined with others
- Works on text streams

---

# 1️⃣ Navigation & Directory Management

## `pwd` — Print Working Directory

```bash
pwd
```

What it does:  
Shows your current location in the filesystem.

Why it matters:

- Always know where you are before running commands
- Prevent accidental file deletion

---

## `ls` — List Files

```bash
ls
ls -l
ls -lh
ls -a
```

What it does:  
Lists files and directories.

Options:

| Option | Meaning                                  |
| ------ | ---------------------------------------- |
| -l     | Detailed list (permissions, size, owner) |
| -h     | Human-readable sizes                     |
| -a     | Show hidden files                        |

Why it matters:

- Inspect directories
- Check permissions and file sizes

---

## `cd` — Change Directory

```bash
cd /etc
cd ~
cd ..
```

What it does:  
Moves you between directories.

Why it matters:

- Navigate system structure quickly

---

## `mkdir` — Create Directory

```bash
mkdir test
mkdir -p parent/child
```

What it does:  
Creates directories.

Why it matters:

- Create project structure
- `-p` creates nested directories safely

---

## Delete Directories

```bash
rmdir test
rm -r test
rm -rf test
```

What it does:

- `rmdir` → removes empty directory
- `rm -r` → recursive delete
- `rm -rf` → force delete

⚠️ Dangerous command — use carefully.

---

# 2️⃣ File Creation & Manipulation

## `touch` — Create File

```bash
touch file.txt
```

What it does:  
Creates empty file or updates timestamp.

---

## `cp` — Copy Files

```bash
cp file.txt copy.txt
cp -r dir1 dir2
```

What it does:  
Copies files/directories.

Why it matters:

- Backup files
- Duplicate configs

---

## `mv` — Move / Rename

```bash
mv file.txt new.txt
mv file.txt /tmp/
```

What it does:  
Moves or renames files.

---

# 3️⃣ Viewing File Content

## `cat` — Display File

```bash
cat file.txt
```

What it does:  
Prints file content to terminal.

---

## `zcat` — Read Compressed Files

```bash
zcat file.gz
```

What it does:  
Reads `.gz` files without extracting.

---

## `less` / `more`

```bash
less file.txt
more file.txt
```

What it does:  
View large files page by page.

👉 `less` is preferred (scrollable).

---

## `head` / `tail`

```bash
head file.txt
tail file.txt
tail -f logfile.log
```

What it does:

- `head` → first lines
- `tail` → last lines
- `tail -f` → live log monitoring

---

# 4️⃣ Text Processing Commands

## `wc` — Count

```bash
wc file.txt
wc -l file.txt
```

What it does:  
Counts lines, words, bytes.

---

## `cut` — Extract Columns

```bash
cut -d ":" -f1 /etc/passwd
```

What it does:  
Extracts specific fields.

---

## `sort` — Sort Data

```bash
sort file.txt
sort -n numbers.txt
```

What it does:  
Sorts lines alphabetically or numerically.

---

## `diff` — Compare Files

```bash
diff file1.txt file2.txt
```

What it does:  
Shows differences between files.

---

## `tee` — Output + Save

```bash
echo "hello" | tee file.txt
```

What it does:  
Writes output to file AND terminal.

---

# 5️⃣ Links (Important Concept)

## Hard Link

```bash
ln file.txt hardlink.txt
```

What it does:  
Creates another reference to same file.

---

## Soft Link (Symlink)

```bash
ln -s file.txt symlink.txt
```

What it does:  
Creates pointer to file.

---

# 6️⃣ System Utilities

## `clear`

```bash
clear
```

Clears terminal screen.

---

# 7️⃣ Editing Files — vi

```bash
vi file.txt
```

Modes:

| Mode | Action      |
| ---- | ----------- |
| i    | Insert      |
| Esc  | Exit insert |
| :w   | Save        |
| :q   | Quit        |
| :wq  | Save + Quit |

---

# 🧪 Day-4 Lab

```bash
pwd
ls -l
cd /tmp

mkdir testdir
cd testdir
touch file1.txt
echo "hello world" > file1.txt

cp file1.txt file2.txt
mv file2.txt renamed.txt

cat file1.txt
less file1.txt
head file1.txt
tail file1.txt

wc file1.txt
cut -d " " -f1 file1.txt
sort file1.txt

ln file1.txt hardlink.txt
ln -s file1.txt symlink.txt

diff file1.txt renamed.txt

cd ..
rm -r testdir
```

---

# 🧠 Key Takeaways

- CLI is your main interface
- Files & logs are core to debugging
- Commands are composable
- Small tools → powerful workflows

---

# ✅ Outcome

You can now:

- Navigate Linux systems confidently
- Manage files and directories
- Inspect file contents
- Perform basic data processing
- Understand links and editing

Next → Advanced Linux Commands 🚀
