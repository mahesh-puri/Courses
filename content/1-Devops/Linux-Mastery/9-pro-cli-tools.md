---
title: "Day 09 — Pro CLI Tools (AWK, GREP, FIND, SED)"
description: "In-depth understanding of powerful Linux text processing and searching tools used in real DevOps workflows."
---

# Day 09 — Pro CLI Tools (AWK, GREP, FIND, SED)

## 🎯 Goal

Develop mastery over the most powerful Linux CLI tools used for:

- Searching data
- Filtering logs
- Transforming text
- Automating system tasks

These tools form the backbone of **real-world DevOps debugging, scripting, and automation**.

---

# 🧠 Mental Model

Linux treats everything as **text streams**.

```
Input → Process → Output
```

These tools allow you to:

- Extract specific information
- Transform data dynamically
- Chain commands into powerful pipelines

---

# 1️⃣ GREP — Pattern Searching Tool

## Core Idea

`grep` is used to **search for patterns inside text**. It scans input line by line and prints only the lines that match a given pattern. This makes it extremely useful when dealing with logs, configuration files, or command outputs where only specific lines are relevant.

---

## Basic Usage

```bash
grep "error" logfile.txt
```

This command searches for the word "error" inside the file and prints matching lines.

---

## Explanation (Deep Understanding)

Internally, `grep` uses pattern matching (regular expressions). It does not read the entire file into memory; instead, it processes it line by line, making it efficient even for very large files.

---

## Common Options

```bash
grep -i "error" file.txt
grep -r "nginx" /etc/
grep -n "fail" file.txt
grep -v "debug" file.txt
```

- `-i` → case-insensitive search
- `-r` → recursive search in directories
- `-n` → show line numbers
- `-v` → invert match (exclude pattern)

---

## Examples

```bash
ps aux | grep nginx
```

Filters running processes to find nginx.

```bash
grep "ERROR" /var/log/syslog
```

Finds error logs in system logs.

```bash
grep -ri "password" /etc/
```

Searches recursively for the word "password" ignoring case.

---

## Real DevOps Use Case

When debugging production systems, logs can be massive. `grep` allows you to quickly isolate relevant lines without manually scanning entire files.

---

# 2️⃣ AWK — Pattern Processing & Data Extraction

## Core Idea

`awk` is a powerful **text processing language** designed to work with structured text. It processes input line by line, splits each line into fields, and allows you to perform operations on those fields.

---

## Mental Model

Each line is divided into fields:

```
$1 $2 $3 ...
```

By default, fields are separated by whitespace.

---

## Basic Usage

```bash
awk '{print $1}' file.txt
```

Prints the first column of each line.

---

## Explanation (Deep Understanding)

`awk` is not just a command; it is a mini programming language. It supports variables, loops, conditions, and arithmetic operations. This makes it extremely powerful for transforming structured text like logs, CSV files, and command outputs.

---

## Examples

```bash
ps aux | awk '{print $1, $2}'
```

Prints user and PID from process list.

```bash
awk '{sum += $1} END {print sum}' numbers.txt
```

Calculates sum of numbers in a file.

```bash
awk -F ":" '{print $1}' /etc/passwd
```

Uses ":" as delimiter and prints usernames.

---

## Conditional Processing

```bash
awk '$3 > 100 {print $1, $3}' file.txt
```

Prints lines where third column is greater than 100.

---

## Real DevOps Use Case

`awk` is heavily used for:

- Parsing logs
- Extracting metrics
- Generating reports
- Transforming command outputs

---

# 3️⃣ FIND — File Searching Tool

## Core Idea

`find` is used to **search for files and directories** in a filesystem based on conditions like name, type, size, or time.

---

## Basic Usage

```bash
find /path -name "file.txt"
```

Searches for a file by name.

---

## Explanation (Deep Understanding)

Unlike simple listing commands, `find` recursively traverses directory trees and evaluates conditions for each file. It can also execute commands on matched results, making it extremely powerful.

---

## Examples

```bash
find /var/log -name "*.log"
```

Finds all `.log` files.

```bash
find . -type d
```

Finds directories only.

```bash
find . -size +100M
```

Finds files larger than 100MB.

```bash
find . -mtime -1
```

Finds files modified in last 24 hours.

---

## Execute Command

```bash
find . -name "*.tmp" -exec rm {} \;
```

Deletes all `.tmp` files.

---

## Real DevOps Use Case

- Cleaning old logs
- Finding large files filling disk
- Automating maintenance tasks

---

# 4️⃣ SED — Stream Editor

## Core Idea

`sed` is used to **edit and transform text streams**. It works line by line and can modify content without opening files in an editor.

---

## Basic Usage

```bash
sed 's/old/new/' file.txt
```

Replaces first occurrence of "old" with "new".

---

## Explanation (Deep Understanding)

`sed` operates as a stream editor, meaning it processes input sequentially. It is non-interactive and highly efficient for batch modifications, making it ideal for automation scripts.

---

## Examples

```bash
sed 's/error/warning/g' file.txt
```

Replaces all occurrences globally.

```bash
sed -i 's/8080/9090/g' config.txt
```

Edits file in-place.

```bash
sed -n '1,5p' file.txt
```

Prints first 5 lines.

```bash
sed '/error/d' file.txt
```

Deletes lines containing "error".

---

## Real DevOps Use Case

- Updating configuration files
- Modifying logs
- Rewriting environment variables
- Automating deployments

---

# 🔗 Combining Tools (Power of Linux)

These tools become extremely powerful when combined:

```bash
ps aux | grep nginx | awk '{print $2}'
```

Gets PID of nginx process.

```bash
cat logfile.txt | grep ERROR | awk '{print $5}' | sort | uniq -c
```

Counts occurrences of errors.

```bash
find . -name "*.log" | xargs grep "ERROR"
```

Searches for errors across all log files.

---

# 🧪 Practice Lab

```bash
grep "error" logfile.txt
grep -ri "config" /etc/

awk '{print $1}' file.txt
awk -F ":" '{print $1}' /etc/passwd

find . -name "*.log"
find . -size +50M

sed 's/foo/bar/g' file.txt
sed -i 's/localhost/127.0.0.1/g' config.txt
```

---

# Shell Scripting for DevOps

## 🎯 Goal

Understand how to automate repetitive tasks using shell scripts and build real-world DevOps workflows.

---

# 🧠 Mental Model

A shell script is simply:

A file containing a sequence of commands executed by the shell interpreter.

Instead of typing commands manually, you write them once and reuse them.

This enables:

- Automation
- Consistency
- Scalability

---

# 1️⃣ What is a Shell?

A shell is a command interpreter that takes user input and executes it.

Common shells:

- bash (most common)
- zsh
- sh

In DevOps, bash scripting is the standard.

---

# 2️⃣ Writing Your First Script

Create a script:

nano script.sh

Example:

#!/bin/bash
echo "Hello, World"

Make executable:

chmod +x script.sh

Run:

./script.sh

---

## Explanation

- #!/bin/bash → shebang, defines interpreter
- echo → prints output
- chmod +x → makes script executable

---

# 3️⃣ Variables

Variables store data and make scripts dynamic.

name="Mahesh"
echo "Hello $name"

---

## Explanation

- No spaces around =
- Access using $variable

---

## Command Substitution

date_now=$(date)
echo "Current date: $date_now"

Stores command output into variable.

---

# 4️⃣ User Input

read -p "Enter your name: " name
echo "Welcome $name"

---

## Explanation

- read takes user input
- -p shows prompt

---

# 5️⃣ Conditional Statements

## if Statement

if [ "$name" = "admin" ]; then
echo "Welcome Admin"
else
echo "Access denied"
fi

---

## Explanation

Conditionals allow decision-making in scripts.

---

## Numeric Comparison

num=10

if [ $num -gt 5 ]; then
echo "Greater than 5"
fi

Operators:

- -eq → equal
- -ne → not equal
- -gt → greater than
- -lt → less than

---

# 6️⃣ Loops

## for Loop

for i in 1 2 3 4 5
do
echo "Number: $i"
done

---

## while Loop

count=1

while [ $count -le 5 ]
do
echo "Count: $count"
((count++))
done

---

## Explanation

Loops enable repetition:

- process multiple files
- automate tasks
- iterate logs

---

# 7️⃣ Functions

greet() {
echo "Hello $1"
}

greet Mahesh

---

## Explanation

- Functions improve structure
- $1 is first argument

---

# 8️⃣ Exit Codes

Every command returns:

- 0 → success
- non-zero → failure

Example:

if [ $? -eq 0 ]; then
echo "Success"
else
echo "Failed"
fi

---

## Explanation

$? stores last command status.

Critical for automation and CI/CD.

---

# 9️⃣ File Checks

if [ -f file.txt ]; then
echo "File exists"
fi

---

## Common Checks

- -f → file exists
- -d → directory exists
- -e → exists

---

# 🔟 Arguments in Scripts

echo "First argument: $1"
echo "Second argument: $2"

Run:

./script.sh hello world

---

## Explanation

- $1, $2 → arguments
- $# → count
- $@ → all arguments

---

# 1️⃣1️⃣ Logging & Debugging

## Debug Mode

set -x

Shows commands as executed.

---

## Logging

echo "Script started at $(date)" >> log.txt

---

# 🔗 Real DevOps Example

#!/bin/bash

echo "Checking disk usage..."

usage=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

if [ $usage -gt 80 ]; then
echo "Disk usage high: $usage%"
else
echo "Disk usage normal: $usage%"
fi

---

## Explanation

This script:

- uses df to get disk usage
- awk to extract column
- sed to clean %
- applies condition

This is real production scripting.

---

# 🧪 Practice Lab

nano test.sh

#!/bin/bash
echo "Hello DevOps"

chmod +x test.sh
./test.sh

name="Linux"
echo $name

for i in 1 2 3; do echo $i; done

if [ 5 -gt 3 ]; then echo "Yes"; fi

---

# 🧠 Key Takeaways

- Shell scripts automate repetitive tasks and workflows
- Variables make scripts dynamic and reusable
- Conditions enable decision-making based on system state
- Loops allow efficient repetition and batch processing
- Functions help structure and reuse logic
- Exit codes control execution flow in automation and CI/CD
- grep filters and searches text data
- awk processes structured text and extracts fields
- find searches files and directories efficiently
- sed modifies and transforms text streams
- Combining these tools enables powerful real-world automation

---

# ✅ Outcome

You can now:

- Write and execute shell scripts
- Automate system-level tasks
- Use conditions, loops, and functions effectively
- Debug and control script execution
- Search and analyze logs efficiently
- Extract, transform, and manipulate data
- Build production-ready DevOps workflows
- Solve real-world problems using CLI pipelines

---

# 🔥 CLI Power Tools (Bridge to Next Module)

- grep → filter data
- awk → process structured text
- find → search filesystem
- sed → modify streams

Combining them unlocks real power.
