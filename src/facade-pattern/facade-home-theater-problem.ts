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

/**
 * Class that represents a popcorn maker in a home theater setup.
 */
export class PopcornMaker {
  /**
   * Turns the popcorn maker on.
   */
  turnOn(): void {
    console.log('PopcornMaker: ON');
  }

  /**
   * Turns the popcorn maker off.
   */
  turnOff(): void {
    console.log('PopcornMaker: OFF');
  }

  /**
   * Starts the popping process.
   */
  pop(): void {
    console.log('PopcornMaker: Popping corn...');
  }
}

/**
 * Class that represents the lighting system of the room.
 */
export class Lights {
  /**
   * Dims the lights to create a cinematic atmosphere.
   */
  dim(): void {
    console.log('Lights: Dimming');
  }
}

/**
 * Class that represents a television.
 */
export class TV {
  /**
   * Turns the television on.
   */
  turnOn(): void {
    console.log('TV: ON');
  }

  /**
   * Turns the television off.
   */
  turnOff(): void {
    console.log('TV: OFF');
  }
}

/**
 * Class that represents an audio amplifier.
 */
export class Amplifier {
  /**
   * Turns the amplifier on.
   */
  turnOn(): void {
    console.log('Amplifier: ON');
  }

  /**
   * Turns the amplifier off.
   */
  turnOff(): void {
    console.log('Amplifier: OFF');
  }

  /**
   * Sets the input source of the amplifier.
   * @param source Name of the input source (e.g., 'blu-ray').
   * @throws {Error} If the source string is empty.
   */
  setSource(source: string): void {
    if (source.length === 0) {
      throw new Error('Source name cannot be empty.');
    }
    console.log(`Amplifier: Source set to ${source}`);
  }

  /**
    * Sets the volume level of the amplifier.
   * @param level The numerical volume level.
   * @throws {Error} If the volume level is negative.
   */
  setVolume(level: number): void {
    if (level < 0) {
      throw new Error('Volume cannot be negative.');
    }
    console.log(`Amplifier: Volume set to ${level}`);
  }
}

/**
 * Class that represents a Blu-Ray player.
 */
export class BluRayPlayer {
  /**
   * Turns the Blu-Ray player on.
   */
  turnOn(): void {
    console.log('BluRayPlayer: ON');
  }

  /**
   * Turns the Blu-Ray player off.
   */
  turnOff(): void {
    console.log('BluRayPlayer: OFF');
  }

  /**
   * Starts playing the loaded media.
   */
  play(): void {
    console.log('BluRayPlayer: Playing movie');
  }
}

/**
 * Main entry point for the program that exemplifies the issues of not using
 * a Facade pattern when interacting with complex subsystems.
 */
export function main() {
  const amp = new Amplifier();
  const bluray = new BluRayPlayer();
  const lights = new Lights();
  const tv = new TV();
  const popcornMaker = new PopcornMaker();

  /** 
   * PROBLEM: The client code is responsible for knowing the exact order and
   * methods required to set up the environment. This causes high coupling.
   */
  console.log('--- Starting Movie Setup ---');
  popcornMaker.turnOn();
  popcornMaker.pop();
  lights.dim();
  tv.turnOn();
  amp.turnOn();
  amp.setSource('blu-ray');
  amp.setVolume(11);
  bluray.turnOn();
  bluray.play();

  /** 
   * If we needed to stop the movie, we would have to manually shut down
   * each subsystem again, leading to code duplication.
   */
}

main();