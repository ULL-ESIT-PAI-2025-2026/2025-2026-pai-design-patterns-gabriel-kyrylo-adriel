# Source code

## Implemented Patterns

### 1. Adapter (Structural)
* **Description**: Allows objects with incompatible interfaces to collaborate by wrapping the "adaptee" and translating its data.
* **Example**: A currency adapter that translates data from an external service (Dollars) into a format the local system understands (Euros).
* **Files**: `adapter-pattern-money-problem.ts`, `adapter-pattern-money-solution.ts`.

### 2. Builder (Creational) & Director
* **Description**: Solves the "telescoping constructor" anti-pattern by allowing step-by-step construction of complex objects.
* **Example**: Constructs complex users modularly with a builder object. It also exemplifies the construction of different user variants (e.g., "Red" and "Blue") using a director object that orchestrates the building steps for various concrete builder implementations.
* **Files**: `builder-pattern-user-problem.ts`, `builder-pattern-user-solution.ts`, `builder-pattern-user-director.ts`.

### 3. Facade (Structural)
* **Description**: Provides a simplified interface to a complex set of classes, library, or subsystem.
* **Example**: A Home Theater Facade that orchestrates an amplifier, lights, television, and popcorn maker with a single command.
* **Files**: `facade-home-theater-problem.ts`, `facade-home-theater-solution.ts`.

### 4. Mediator (Behavioral)
* **Description**: Reduces tight coupling between objects by making them communicate through a central mediator object.
* **Example**: An Air Traffic Tower coordinating landings between airplanes and runways so planes don't communicate with runways directly.
* **Files**: `air-traffic-problem.ts`, `air-traffic-solution.ts`.

### 5. Singleton (Creational)
* **Description**: Ensures a class has only one instance and provides a global point of access to it.
* **Example**: A National Government where only one instance can exist to prevent state desynchronization.
* **Files**: `singleton-pattern-government-problem.ts`, `singleton-pattern-government-solution.ts`.

## Technical Specifications
* **Language**: TypeScript.
* **Academic Approach**: All related classes for each pattern are implemented within the same file for clarity.
* **Features**: Use of private constructors (Singleton), interface abstraction (Adapter), and centralized coordination (Mediator).