/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2025-2026
 *
 * @author Adriel Reyes Suárez
 * @author Francisco Gabriel Ruiz Ruiz
 * @author Kyrylo Chvanov
 * @since Mar 8 2026
 * @desc Program that exemplifies the PROBLEM of highly coupled client code 
 * dealing with a complex subsystem. For academic purposes, all classes 
 * involved will be declared and implemented in this same file.
 * @see {@link https://refactoring.guru/design-patterns/facade}
 */

/** @desc Class that represents a popcorn maker in a home theater setup. */
export class PopcornMaker {
  /** @desc Turns the popcorn maker on. */
  turnOn(): void {
    console.log('PopcornMaker: ON');
  }

  /** @desc Turns the popcorn maker off. */
  turnOff(): void {
    console.log('PopcornMaker: OFF');
  }

  /** @desc Starts the popping process. */
  pop(): void {
    console.log('PopcornMaker: Popping corn...');
  }
}

/** @desc Class that represents the lighting system of the room. */
export class Lights {
  /** @desc Dims the lights to create a cinematic atmosphere. */
  dim(): void {
    console.log('Lights: Dimming');
  }
}

/** @desc Class that represents a television. */
export class Television {
  /** @desc Turns the television on. */
  turnOn(): void {
    console.log('TV: ON');
  }

  /** @desc Turns the television off. */
  turnOff(): void {
    console.log('TV: OFF');
  }
}

/** @desc Class that represents an audio amplifier. */
export class Amplifier {
  /** @desc Turns the amplifier on. */
  turnOn(): void {
    console.log('Amplifier: ON');
  }

  /** @desc Turns the amplifier off. */
  turnOff(): void {
    console.log('Amplifier: OFF');
  }

  /** @desc Sets the input source of the amplifier. */
  setSource(source: string): void {
    if (source.length === 0) {
      throw new Error('Source name cannot be empty.');
    }
    console.log(`Amplifier: Source set to ${source}`);
  }

  /** @desc Sets the volume level of the amplifier. */
  setVolume(level: number): void {
    if (level < 0) {
      throw new Error('Volume cannot be negative.');
    }
    console.log(`Amplifier: Volume set to ${level}`);
  }
}

/** @desc Class that represents a Blu-Ray player. */
export class BluRayPlayer {
  /** @desc Turns the Blu-Ray player on. */
  turnOn(): void {
    console.log('BluRayPlayer: ON');
  }

  /** @desc Turns the Blu-Ray player off. */
  turnOff(): void {
    console.log('BluRayPlayer: OFF');
  }

  /** @desc Starts playing the loaded media. */
  play(): void {
    console.log('BluRayPlayer: Playing movie');
  }
}

/**
 * @desc Main entry point for the program that exemplifies the issues of not using
 * a Facade pattern when interacting with complex subsystems.
 */
export function main() {
  const amplifier = new Amplifier();
  const bluray = new BluRayPlayer();
  const lights = new Lights();
  const television = new Television();
  const popcornMaker = new PopcornMaker();

  // PROBLEM: The client code is responsible for knowing the exact order and
  // methods required to set up the environment. This causes high coupling.
  console.log('--- Starting Movie Setup ---');
  popcornMaker.turnOn();
  popcornMaker.pop();
  lights.dim();
  television.turnOn();
  amplifier.turnOn();
  amplifier.setSource('blu-ray');
  amplifier.setVolume(11);
  bluray.turnOn();
  bluray.play();

  // If we needed to stop the movie, we would have to manually shut down
  // each subsystem again, leading to code duplication.
}

main();
