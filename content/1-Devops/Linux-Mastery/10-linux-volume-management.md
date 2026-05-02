---
title: "Day 10 — Linux Volume Management"
description: "Understand Linux storage, mounting, AWS EBS, and introduction to LVM for dynamic storage management."
---

# Day 10 — Linux Volume Management

## 🎯 Goal

Build a strong understanding of how Linux manages storage:

- Disks and partitions
- Mounting filesystems
- Cloud storage (AWS EBS)
- Introduction to LVM

Storage is critical in DevOps because:

- Applications need persistent data
- Logs grow continuously
- Systems fail when disks fill up

---

# 🧠 Mental Model

Storage in Linux flows like this:

Disk → Partition → Filesystem → Mount Point → Application

In advanced setups:

Disk → Physical Volume → Volume Group → Logical Volume → Filesystem → Mount

---

# 1️⃣ What is a Linux Volume?

A volume is simply **storage that the OS can use**.

It can be:

- A physical disk
- A partition
- A virtual disk (cloud)

Examples:

- `/dev/sda` → disk
- `/dev/sda1` → partition

---

# 2️⃣ Types of Storage in Linux

| Type          | Description                         |
| ------------- | ----------------------------------- |
| Physical disk | Real hardware                       |
| Partition     | Logical division of disk            |
| Filesystem    | Structure to store files            |
| Mount point   | Directory where storage is attached |

---

# 3️⃣ Viewing Disks & Partitions

````bash
lsblk
fdisk -l
df -h
Explanation
lsblk → shows disks and hierarchy
fdisk -l → detailed partition info
df -h → mounted filesystem usage
4️⃣ Mounting Volumes

Mounting connects a storage device to the filesystem.

Mount a volume
sudo mount /dev/sdb1 /mnt/data
Unmount
sudo umount /mnt/data
Persistent Mount (fstab)
sudo nano /etc/fstab

Example entry:

/dev/sdb1 /mnt/data ext4 defaults 0 2
Explanation
Mount makes storage accessible
Without mounting, disk exists but is unusable
/etc/fstab ensures mount survives reboot
5️⃣ AWS EBS (Elastic Block Store)
What is EBS?

Amazon EBS is a network-attached block storage used with EC2.

Think of it as:

Virtual Hard Disk attached to cloud server
Key Characteristics
Persistent storage (data survives reboot)
Can be attached/detached
Scalable (resize anytime)
Snapshot support
EBS in Linux

When attached to EC2, appears as:

/dev/xvdf
/dev/nvme0n1
Steps to Use EBS
1. Check disk
lsblk
2. Create filesystem
sudo mkfs.ext4 /dev/xvdf
3. Mount it
sudo mount /dev/xvdf /mnt/data
4. Persist mount

Add to /etc/fstab

Real DevOps Use Cases
Store application data
Store logs (/var/log)
Database storage
Backup volumes
6️⃣ Introduction to LVM

LVM = Logical Volume Manager

It allows flexible storage management.

Why LVM?

Without LVM:

Disk sizes are fixed
Hard to resize

With LVM:

Resize storage dynamically
Combine multiple disks
Create flexible volumes
🧠 LVM Mental Model
Physical Volume (PV) → Volume Group (VG) → Logical Volume (LV)
``` id="lvmflow"

---

# 7️⃣ LVM Components

## Physical Volume (PV)

```bash
pvcreate /dev/sdb

Represents physical disk.

Volume Group (VG)
vgcreate my_vg /dev/sdb

Combines multiple disks.

Logical Volume (LV)
lvcreate -L 5G -n my_lv my_vg

Acts like a partition.

Format & Mount
mkfs.ext4 /dev/my_vg/my_lv
mount /dev/my_vg/my_lv /mnt/data
8️⃣ Using LVM with AWS EBS
Why combine EBS + LVM?

Because:

EBS volumes can grow
LVM allows resizing filesystem
Example Workflow
# attach EBS
lsblk

# create PV
pvcreate /dev/xvdf

# create VG
vgcreate data_vg /dev/xvdf

# create LV
lvcreate -L 10G -n data_lv data_vg

# format
mkfs.ext4 /dev/data_vg/data_lv

# mount
mount /dev/data_vg/data_lv /mnt/data
Extend Storage (Real DevOps Scenario)
lvextend -L +5G /dev/data_vg/data_lv
resize2fs /dev/data_vg/data_lv
9️⃣ Key Commands Summary
Command	Purpose
lsblk	show disks
df -h	disk usage
mount	attach storage
umount	detach storage
mkfs	create filesystem
pvcreate	create PV
vgcreate	create VG
lvcreate	create LV
🧪 Practice Lab
lsblk

sudo mkfs.ext4 /dev/sdb
sudo mount /dev/sdb /mnt/data

df -h

pvcreate /dev/sdb
vgcreate my_vg /dev/sdb
lvcreate -L 2G -n my_lv my_vg

mkfs.ext4 /dev/my_vg/my_lv
mount /dev/my_vg/my_lv /mnt/lvm
🧠 Key Takeaways
Storage must be mounted to be usable
Cloud storage (EBS) behaves like local disk
LVM adds flexibility and scalability
Logical volumes allow dynamic resizing
Combining EBS + LVM is common in production
✅ Outcome

You can now:

Understand Linux storage layers
Mount and manage volumes
Work with AWS EBS on EC2
Understand LVM concepts
Create flexible storage systems
````

## 🎉 You have now completed Linux Storage Mastery.
