---
title: "Factory Method"
pattern_category: Creational
difficulty: Intermediate
author: Mahesh Puri
---

# Factory Method

## 1. Intent

Define an interface for creating an object, but **let subclasses decide which class to instantiate**.  
The Factory Method pattern allows a class to **delegate object creation to subclasses**, promoting loose coupling and better extensibility.

In simple terms:

> Instead of calling `new` directly, the creation of objects is delegated to a **factory method**.

---

# 2. Problem (Why pattern exists)

In many systems, objects are created directly using constructors.

Example:

```java
Payment payment;

if (type.equals("CARD")) {
    payment = new CreditCardPayment();
} else if (type.equals("UPI")) {
    payment = new UpiPayment();
} else if (type.equals("PAYPAL")) {
    payment = new PaypalPayment();
}
```

### Problems With This Approach

1. **Tight Coupling**

The client code depends on concrete classes.

```
CreditCardPayment
UpiPayment
PaypalPayment
```

Any new payment type requires modifying the client.

---

2. **Violation of Open/Closed Principle**

The code is **not closed for modification**.

Every new payment type requires changing existing code.

---

3. **Scattered Object Creation Logic**

Creation logic spreads across multiple classes.

---

4. **Harder Testing and Maintenance**

Because object creation is tightly coupled to business logic.

---

### Problem Summary

```
Object creation logic becomes tightly coupled with business logic,
making the system harder to extend and maintain.
```

The Factory Method pattern solves this by **delegating object creation to subclasses**.

---

# 3. Real World Analogy

Consider a **logistics company** that ships packages.

Different transportation methods exist:

```
Truck
Ship
Airplane
```

Each logistics company decides **how the product is delivered**.

For example:

```
RoadLogistics → Truck
SeaLogistics → Ship
AirLogistics → Airplane
```

The **logistics company defines the delivery process**, but the **actual transport type varies**.

This is exactly how Factory Method works.

---

# 4. Pattern Structure (participants and responsibilities)

### Components

| Component       | Responsibility                                       |
| --------------- | ---------------------------------------------------- |
| Product         | Interface or abstract class defining object behavior |
| ConcreteProduct | Actual implementation of the product                 |
| Creator         | Declares the factory method                          |
| ConcreteCreator | Implements the factory method                        |

---

### Participants Explained

**Product**

Defines the interface for objects created by the factory.

Example:

```
Payment
```

---

**ConcreteProduct**

Actual implementations.

Examples:

```
CreditCardPayment
UpiPayment
PaypalPayment
```

---

**Creator**

Declares the factory method.

Example:

```
PaymentFactory
```

---

**ConcreteCreator**

Subclasses that implement the factory method.

Examples:

```
CardPaymentFactory
UpiPaymentFactory
```

---

# 5. UML Diagram (ASCII diagram)

```
                Creator
           +------------------+
           |  PaymentFactory  |
           +------------------+
           | createPayment()  |
           +------------------+
                    |
        -----------------------------
        |                           |
ConcreteCreator             ConcreteCreator
CardPaymentFactory          UpiPaymentFactory
        |                           |
        v                           v

      Product
    +---------+
    | Payment |
    +---------+
        |
  -------------------------
  |           |           |
CreditCard   UPI        PayPal
Payment     Payment     Payment
```

### Relationships

| Relationship  | Explanation                             |
| ------------- | --------------------------------------- |
| Inheritance   | Factories extend the creator            |
| Polymorphism  | Factory decides which product to create |
| Encapsulation | Object creation hidden from client      |

---

# 6. Java Implementation

## Step 1: Product Interface

```java
public interface Payment {
    void processPayment(double amount);
}
```

---

## Step 2: Concrete Products

```java
public class CreditCardPayment implements Payment {

    @Override
    public void processPayment(double amount) {
        System.out.println("Processing credit card payment: " + amount);
    }
}
```

```java
public class UpiPayment implements Payment {

    @Override
    public void processPayment(double amount) {
        System.out.println("Processing UPI payment: " + amount);
    }
}
```

```java
public class PaypalPayment implements Payment {

    @Override
    public void processPayment(double amount) {
        System.out.println("Processing PayPal payment: " + amount);
    }
}
```

---

## Step 3: Creator (Factory)

```java
public abstract class PaymentFactory {

    public abstract Payment createPayment();

}
```

---

## Step 4: Concrete Factories

```java
public class CreditCardPaymentFactory extends PaymentFactory {

    @Override
    public Payment createPayment() {
        return new CreditCardPayment();
    }
}
```

```java
public class UpiPaymentFactory extends PaymentFactory {

    @Override
    public Payment createPayment() {
        return new UpiPayment();
    }
}
```

---

## Step 5: Client Usage

```java
public class CheckoutService {

    public static void main(String[] args) {

        PaymentFactory factory = new CreditCardPaymentFactory();

        Payment payment = factory.createPayment();

        payment.processPayment(1000);
    }
}
```

### Execution Flow

1. Client chooses factory.
2. Factory creates appropriate product.
3. Client uses product via interface.

---

# 7. Variations of the Pattern

### 1. Simple Factory (Not GoF)

A single class creates objects based on parameters.

```java
public class PaymentFactory {

    public static Payment create(String type) {

        if (type.equals("CARD")) {
            return new CreditCardPayment();
        }

        if (type.equals("UPI")) {
            return new UpiPayment();
        }

        throw new IllegalArgumentException("Invalid type");
    }
}
```

This is **not a true Factory Method**, but commonly used.

---

### 2. Parameterized Factory Method

Factory method accepts parameters.

```java
public abstract Payment createPayment(String region);
```

---

### 3. Dependency Injection Factories

Frameworks like Spring delegate object creation to containers.

Example:

```
BeanFactory
ApplicationContext
```

---

# 8. Real Production Examples

## Java Calendar API

```java
Calendar calendar = Calendar.getInstance();
```

`Calendar` internally returns:

```
GregorianCalendar
```

depending on system configuration.

---

## Java Collections Factory Methods

Example:

```java
List<String> list = List.of("A", "B", "C");
```

The exact implementation is hidden.

---

## Spring Framework

### BeanFactory

```
org.springframework.beans.factory.BeanFactory
```

Responsible for creating beans dynamically.

---

### LoggerFactory (SLF4J)

```java
Logger logger = LoggerFactory.getLogger(MyClass.class);
```

Factory decides logger implementation.

---

# 9. When To Use / When NOT To Use

## When To Use

Use Factory Method when:

- Object creation logic is complex
- Classes should not depend on concrete implementations
- The system must be easily extensible
- Creation logic may change frequently

Examples:

```
Database connectors
Payment processors
Message brokers
UI component frameworks
```

---

## When NOT To Use

Avoid when:

- Object creation is trivial
- Only one product exists
- It adds unnecessary abstraction

---

# 10. Refactoring Example (bad code → improved design)

### Before (Bad Code)

```java
public class NotificationService {

    public void sendNotification(String type) {

        if (type.equals("EMAIL")) {
            EmailNotification notification = new EmailNotification();
            notification.send();
        }

        if (type.equals("SMS")) {
            SmsNotification notification = new SmsNotification();
            notification.send();
        }
    }
}
```

Problems:

```
Hard to extend
Violates Open/Closed principle
```

---

### After (Factory Method)

```java
public abstract class NotificationFactory {

    public abstract Notification createNotification();

}
```

Client uses factory.

```
factory.createNotification()
```

No conditionals needed.

---

# 11. Advantages

- Eliminates tight coupling
- Supports Open/Closed principle
- Improves maintainability
- Centralizes object creation
- Supports polymorphism

---

# 12. Disadvantages

- Increases number of classes
- Adds additional abstraction
- May be unnecessary for simple systems

---

# 13. Related Patterns

| Pattern          | Relationship                           |
| ---------------- | -------------------------------------- |
| Abstract Factory | Uses multiple factory methods          |
| Builder          | Focuses on complex object construction |
| Prototype        | Creates objects by cloning             |
| Singleton        | Factories are often singletons         |

---

# 14. Pattern Recognition Exercise

Identify the design pattern used below.

```java
public abstract class Dialog {

    public abstract Button createButton();

    public void render() {

        Button button = createButton();
        button.render();
    }
}
```

Concrete implementations:

```
WindowsDialog
MacDialog
```

Question:

```
Which pattern allows subclasses to decide which Button implementation to create?
```

---

# 15. Use In E-commerce Master Project

In the **E-commerce architecture project**, Factory Method is used for:

### Payment Processing

```
PaymentFactory
```

Creates payment processors:

```
CreditCardPayment
UpiPayment
WalletPayment
```

Example usage:

```java
PaymentFactory factory = new UpiPaymentFactory();
Payment payment = factory.createPayment();
payment.processPayment(orderAmount);
```

Benefits:

```
New payment methods can be added without modifying existing code.
```

---

# 16. Further Reading

Recommended resources:

### Books

- Design Patterns: Elements of Reusable Object-Oriented Software (GoF)
- Head First Design Patterns
- Effective Java – Joshua Bloch

### Official Documentation

- Java Calendar API
- Spring BeanFactory documentation
- SLF4J LoggerFactory documentation

---
