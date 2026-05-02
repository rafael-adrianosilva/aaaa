import Phaser from "phaser";

export interface MatchSceneTeam {
  name: string;
  tag: string;
  color: string;
}

export interface MatchSceneData {
  home: MatchSceneTeam;
  away: MatchSceneTeam;
  score?: {
    home: number;
    away: number;
  };
  winnerTag?: string;
  roundLabel: string;
}

export class MatchScene extends Phaser.Scene {
  private payload!: MatchSceneData;

  constructor() {
    super("match-scene");
  }

  init(data: MatchSceneData) {
    this.payload = data;
  }

  create() {
    const { width, height } = this.scale;
    this.drawArena(width, height);
    this.drawTeamSide(this.payload.home, 92, "left");
    this.drawTeamSide(this.payload.away, width - 92, "right");
    this.drawCenter(width, height);
  }

  private drawArena(width: number, height: number) {
    const graphics = this.add.graphics();

    graphics.fillStyle(0x101012, 1);
    graphics.fillRect(0, 0, width, height);

    for (let x = 40; x < width; x += 40) {
      graphics.lineStyle(1, 0xf6f3e8, 0.05);
      graphics.lineBetween(x, 0, x, height);
    }

    for (let y = 36; y < height; y += 36) {
      graphics.lineStyle(1, 0xf6f3e8, 0.05);
      graphics.lineBetween(0, y, width, y);
    }

    graphics.lineStyle(2, 0xf6f3e8, 0.12);
    graphics.strokeRect(34, 30, width - 68, height - 60);
    graphics.lineBetween(width / 2, 34, width / 2, height - 34);
    graphics.strokeCircle(width / 2, height / 2, 54);

    graphics.fillStyle(hexToNumber(this.payload.home.color), 0.1);
    graphics.fillRect(34, 30, width / 2 - 34, height - 60);
    graphics.fillStyle(hexToNumber(this.payload.away.color), 0.1);
    graphics.fillRect(width / 2, 30, width / 2 - 34, height - 60);
  }

  private drawTeamSide(team: MatchSceneTeam, x: number, side: "left" | "right") {
    const color = hexToNumber(team.color);
    const direction = side === "left" ? 1 : -1;

    this.add
      .text(x, 42, team.tag, {
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "20px",
        fontStyle: "900",
        color: team.color,
      })
      .setOrigin(0.5, 0.5);

    for (let index = 0; index < 5; index += 1) {
      const y = 96 + index * 42;
      const token = this.add.circle(x, y, 12, color, 0.96);
      this.add.circle(x, y, 18, color, 0.12);

      this.tweens.add({
        targets: token,
        x: x + direction * (28 + index * 4),
        duration: 1100 + index * 140,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    }
  }

  private drawCenter(width: number, height: number) {
    const score = this.payload.score
      ? `${this.payload.score.home} : ${this.payload.score.away}`
      : "VS";
    const subtitle = this.payload.winnerTag
      ? `Vencedor ${this.payload.winnerTag}`
      : this.payload.roundLabel;

    this.add
      .text(width / 2, height / 2 - 12, score, {
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "54px",
        fontStyle: "900",
        color: "#f6f3e8",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(width / 2, height / 2 + 42, subtitle, {
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "14px",
        color: "rgba(246, 243, 232, 0.68)",
      })
      .setOrigin(0.5, 0.5);
  }
}

function hexToNumber(hex: string) {
  return Number.parseInt(hex.replace("#", ""), 16);
}
