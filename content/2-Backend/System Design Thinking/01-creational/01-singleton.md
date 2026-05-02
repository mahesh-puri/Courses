---
title: "Singleton"
pattern_category: Creational
difficulty: Beginner
author: Mahesh Puri
---

# Singleton

## 1. Intent

Ensure that a class has **only one instance** and provide a **global access point** to that instance.

The Singleton pattern is used when exactly one object is needed to coordinate actions across the system.

---

# 2. Problem (Why pattern exists)

Many systems require **a single shared instance of a class**.

Examples include:

- Configuration managers
- Logging systems
- Cache managers
- Thread pools

Without a Singleton, multiple instances may be created accidentally.

### Example Problem

Consider a configuration manager:

```java
ConfigManager config1 = new ConfigManager();
ConfigManager config2 = new ConfigManager();
```

Problems that arise:

- Multiple objects with different configurations
- Memory waste
- Hard-to-control global state
- Inconsistent system behavior

### What Goes Wrong Without Singleton

Without controlling object creation:

- Multiple instances may exist
- Global shared state becomes inconsistent
- Resource-heavy objects may be recreated unnecessarily

### Problem Summary

A system requires exactly one instance of a class, but normal object creation allows many.

The Singleton pattern solves this by controlling object creation.

---

# 3. Real World Analogy

Think about a printer spooler in an office network.

There should be only one spooler service that manages print jobs.

If multiple spoolers exist:

- Print jobs may conflict
- Printer queues may break
- Jobs may be duplicated

So the system enforces a single spooler instance.

Similarly, a Singleton ensures only one instance exists in the application.

---

# 4. Pattern Structure (participants and responsibilities)

### Components

| Component            | Responsibility                  |
| -------------------- | ------------------------------- |
| Singleton Class      | Controls instance creation      |
| Private Constructor  | Prevents external instantiation |
| Static Instance      | Holds the single object         |
| Global Access Method | Provides access to instance     |

### Responsibilities

- Prevent external object creation.
- Create the instance internally.
- Provide global access to that instance.

---

# 5. UML Diagram

```
        +--------------------+
        |     Singleton      |
        +--------------------+
        | - instance         |
        +--------------------+
        | - Singleton()      |
        | + getInstance()    |
        +--------------------+
```

### Relationships Explained

- **Encapsulation**: Constructor is private.
- **Static reference**: Stores the single instance.
- **Global access**: Provided through getInstance().

---

# 6. Java Implementation

### Basic Singleton (Eager Initialization)

```java
public class Singleton {

    private static final Singleton INSTANCE = new Singleton();

    private Singleton() {
        // private constructor prevents instantiation
    }

    public static Singleton getInstance() {
        return INSTANCE;
    }
}
```

### Usage

```java
Singleton instance1 = Singleton.getInstance();
Singleton instance2 = Singleton.getInstance();

System.out.println(instance1 == instance2); // true
```

Both variables reference the same instance.

---

# 7. Variations of the Pattern

### 1. Eager Initialization

Instance created when class loads.

```java
private static final Singleton INSTANCE = new Singleton();
```

**Pros:**

- Thread-safe
- Simple

**Cons:**

- Instance created even if unused.

### 2. Lazy Initialization

Instance created when first requested.

```java
public class Singleton {

    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

**Problem:**

- Not thread-safe

### 3. Thread Safe Singleton

```java
public synchronized static Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();
    }
    return instance;
}
```

**Cons:**

- Performance overhead due to synchronization.

### 4. Double Checked Locking

Improves performance.

```java
public class Singleton {

    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {

        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }

        return instance;
    }
}
```

### 5. Enum Singleton (Recommended in Java)

Joshua Bloch recommends this approach.

```java
public enum Singleton {

    INSTANCE;

    public void execute() {
        System.out.println("Singleton using enum");
    }
}
```

**Benefits:**

- Thread-safe
- Serialization-safe
- Reflection-safe

### Common Issues

**Reflection Attack**

Reflection can bypass private constructors.

**Serialization Issue**

Serialization can create new instances unless handled.

Enum singleton prevents both problems.

---

# 8. Real Production Examples

### Java Runtime

```java
java.lang.Runtime

Runtime runtime = Runtime.getRuntime();
```

Only one runtime instance per JVM.

### Logging Frameworks

Libraries like:

- Log4j
- SLF4J

Use singleton-like patterns for log managers.

### Spring Framework

By default, Spring beans use singleton scope.

```java
@Service
public class UserService { }
```

Spring creates one instance per application context.

### Java Preferences API

```java
java.util.prefs.Preferences
```

Provides a shared system configuration object.

---

# 9. When To Use / When NOT To Use

### When To Use

Use Singleton when:

- Only one instance must exist
- Object manages shared resources
- Centralized coordination is required

Examples:

- Configuration manager
- Logger
- Cache manager
- Thread pool manager

### When NOT To Use

Avoid Singleton when:

- You need multiple instances later
- It introduces global state
- It complicates testing

Overusing Singleton can make systems harder to maintain and test.

---

# 10. Refactoring Example (bad code → improved design)

### Before (Bad Design)

```java
class ConfigManager {

    public String getConfig() {
        return "config";
    }
}

ConfigManager config1 = new ConfigManager();
ConfigManager config2 = new ConfigManager();
```

**Problems:**

- Multiple instances
- No control over object lifecycle

### After (Singleton)

```java
class ConfigManager {

    private static final ConfigManager INSTANCE = new ConfigManager();

    private ConfigManager(){}

    public static ConfigManager getInstance(){
        return INSTANCE;
    }
}
```

**Usage:**

```java
ConfigManager config = ConfigManager.getInstance();
```

Now there is only one instance.

---

# 11. Advantages

- Guarantees single instance
- Global access point
- Reduces memory usage
- Useful for shared resources
- Simple to implement

---

# 12. Disadvantages

- Introduces global state
- Harder to unit test
- Violates Single Responsibility Principle
- Can hide dependencies
- May cause tight coupling

---

# 13. Related Patterns

| Pattern          | Relationship                                       |
| ---------------- | -------------------------------------------------- |
| Factory Method   | Often used to create singleton instances           |
| Abstract Factory | Factories themselves are often singletons          |
| Builder          | Builder may internally use singleton configuration |
| Flyweight        | Both aim to reduce object creation                 |

---

# 14. Pattern Recognition Exercise

Identify the pattern used below.

```java
public class Logger {

    private static final Logger INSTANCE = new Logger();

    private Logger(){}

    public static Logger getInstance(){
        return INSTANCE;
    }

    public void log(String message){
        System.out.println(message);
    }
}
```

### Question

Which design pattern ensures only one Logger instance exists in the system?

---

# 15. Use In E-commerce Master Project

In the E-commerce architecture project, Singleton can be used for:

### Configuration Manager

```java
ConfigManager config = ConfigManager.getInstance();
String dbUrl = config.getDatabaseUrl();
```

**Responsibilities:**

- Load application configuration
- Provide global access to configuration values

### Other possible uses:

- Logging manager
- Cache manager
- Feature flag manager

---

# 16. Further Reading

### Recommended resources:

### Books

- Design Patterns: Elements of Reusable Object-Oriented Software — GoF
- Effective Java — Joshua Bloch
- Head First Design Patterns

### Online References

- Java Documentation: Runtime.getRuntime()
- Spring Framework Bean Scopes Documentation
