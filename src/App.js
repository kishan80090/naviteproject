import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";

class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill("w"),
      R: Array(9).fill("r"),
      F: Array(9).fill("g"),
      D: Array(9).fill("y"),
      L: Array(9).fill("o"),
      B: Array(9).fill("b"),
    };
  }

  clone() {
    const c = new Cube();
    for (const k in this.faces) c.faces[k] = [...this.faces[k]];
    return c;
  }

  toColorString() {
    const order = ["U", "R", "F", "D", "L", "B"];
    return order.map(f => this.faces[f].join("")).join("");
  }

  rotateFaceCW(faceArr, n = 1) {
    n = ((n % 4) + 4) % 4;
    let a = [...faceArr];
    for (let t = 0; t < n; t++) {
      a = [a[6], a[3], a[0], a[7], a[4], a[1], a[8], a[5], a[2]];
    }
    return a;
  }

  _cyclePositions(positions) {
    const vals = positions.map(([f, i]) => this.faces[f][i]);
    for (let i = 0; i < positions.length; i++) {
      const [f, idx] = positions[i];
      this.faces[f][idx] = vals[(i - 1 + positions.length) % positions.length];
    }
  }

  move_U(times = 1) { this.faces.U = this.rotateFaceCW(this.faces.U, times); for (let t = 0; t < times; t++) this._cyclePositions([["F",0],["F",1],["F",2],["R",0],["R",1],["R",2],["B",0],["B",1],["B",2],["L",0],["L",1],["L",2]]);}
  move_D(times = 1) { this.faces.D = this.rotateFaceCW(this.faces.D, times); for (let t = 0; t < times; t++) this._cyclePositions([["F",6],["F",7],["F",8],["L",6],["L",7],["L",8],["B",6],["B",7],["B",8],["R",6],["R",7],["R",8]]);}
  move_R(times = 1) { this.faces.R = this.rotateFaceCW(this.faces.R, times); for (let t = 0; t < times; t++) this._cyclePositions([["U",2],["U",5],["U",8],["F",2],["F",5],["F",8],["D",2],["D",5],["D",8],["B",6],["B",3],["B",0]]);}
  move_L(times = 1) { this.faces.L = this.rotateFaceCW(this.faces.L, times); for (let t = 0; t < times; t++) this._cyclePositions([["U",0],["U",3],["U",6],["B",8],["B",5],["B",2],["D",0],["D",3],["D",6],["F",0],["F",3],["F",6]]);}
  move_F(times = 1) { this.faces.F = this.rotateFaceCW(this.faces.F, times); for (let t = 0; t < times; t++) this._cyclePositions([["U",6],["U",7],["U",8],["R",0],["R",3],["R",6],["D",2],["D",1],["D",0],["L",8],["L",5],["L",2]]);}
  move_B(times = 1) { this.faces.B = this.rotateFaceCW(this.faces.B, times); for (let t = 0; t < times; t++) this._cyclePositions([["U",2],["U",1],["U",0],["L",0],["L",3],["L",6],["D",6],["D",7],["D",8],["R",8],["R",5],["R",2]]);}

  applyMove(move) {
    const base = move[0];
    const prime = move.length > 1 && move[1] === "'";
    const times = prime ? 3 : 1;
    switch (base) {
      case "U": this.move_U(times); break;
      case "D": this.move_D(times); break;
      case "R": this.move_R(times); break;
      case "L": this.move_L(times); break;
      case "F": this.move_F(times); break;
      case "B": this.move_B(times); break;
      default: console.warn("Unknown move", move);
    }
  }

  applySeq(seq) {
    const moves = typeof seq === "string" ? seq.split(" ") : seq;
    moves.forEach(m => this.applyMove(m));
  }

  isSolved() {
    return Object.values(this.faces).every(f => f.every(c => c === f[0]));
  }
}

function getCubeSvg(colorString, size = 200) {
  const faceOrder = ["U", "R", "F", "D", "L", "B"];
  if (!colorString || colorString.length < 54) colorString = "w".repeat(54);
  const faces = {};
  for (let i = 0; i < 6; i++) faces[faceOrder[i]] = colorString.slice(i * 9, i * 9 + 9).split("");
  const cmap = { r: "#e11d48", g: "#10b981", b: "#2563eb", y: "#f59e0b", o: "#fb923c", w: "#f8fafc" };
  const cell = Math.floor(size / 12), pad = 6;
  const pos = { U: [3, 0], L: [0, 3], F: [3, 3], R: [6, 3], B: [9, 3], D: [3, 6] };
  return (
    <Svg width={size * 1.2} height={size} viewBox={`0 0 ${size * 1.2} ${size}`}>
      {["U", "L", "F", "R", "B", "D"].map(f => {
        const [fx, fy] = pos[f];
        const face = faces[f];
        return face.map((c, i) => {
          const r = Math.floor(i / 3), col = i % 3;
          const x = pad + (fx + col) * cell, y = pad + (fy + r) * cell;
          return <Rect key={`${f}-${i}`} x={x} y={y} width={cell} height={cell} fill={cmap[c]} stroke="#111" strokeWidth={1} rx={4} />;
        });
      })}
    </Svg>
  );
}

export default function App() {
  const [cube, setCube] = useState(new Cube());
  const [scrambleHistory, setScrambleHistory] = useState([]);
  const [movesLog, setMovesLog] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const randomMoves = (n = 20) => {
    const moves = ["U", "R", "F", "D", "L", "B"];
    const suffix = ["", "'"];
    const res = [];
    for (let i = 0; i < n; i++) {
      const m = moves[Math.floor(Math.random() * moves.length)];
      const s = suffix[Math.floor(Math.random() * 2)];
      res.push(m + s);
    }
    return res;
  };

  const scramble = (n = 20) => {
    const fresh = new Cube();
    const moves = randomMoves(n);
    fresh.applySeq(moves);
    setCube(fresh);
    setScrambleHistory(moves);
    setMovesLog("Scrambled!");
  };

  const solve = () => {
    if (scrambleHistory.length === 0) return;
    const invMove = m => m.endsWith("'") ? m.slice(0, -1) : m + "'";
    const inv = [...scrambleHistory].reverse().map(invMove);
    const newCube = cube.clone();
    newCube.applySeq(inv);
    setCube(newCube);
    setMovesLog("Solved? " + (newCube.isSolved() ? "Yes" : "No"));
  };

  const theme = { bg: darkMode ? "#111" : "#f6f8fb", text: darkMode ? "#f8fafc" : "#111", btn: "#2563eb" };
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.bg, minHeight: screenHeight }]}>
      <Text style={[styles.title, { color: theme.text }]}>Rubik's Cube 🧩</Text>

      <View style={styles.cubeCard}>
        {getCubeSvg(cube.toColorString(), 300)}
      </View>

      <Text style={[styles.state, { color: theme.text }]}>State: {cube.toColorString()}</Text>
      <Text style={[styles.movesLog, { color: theme.text }]}>{movesLog}</Text>

      <Text style={[styles.paragraph, { color: theme.text }]}>
        Scramble the cube randomly and then solve it automatically. Great way to visualize 3D rotations in React Native.
      </Text>

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.btn }]} onPress={() => scramble(20)}>
          <Text style={styles.btnText}>Scramble (20)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.btn }]} onPress={solve}>
          <Text style={styles.btnText}>Solve</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.btn }]} onPress={() => setDarkMode(!darkMode)}>
          <Text style={styles.btnText}>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    letterSpacing: 1,
  },
  cubeCard: {
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  state: {
    fontSize: 12,
    marginTop: 10,
    opacity: 0.7,
    fontFamily: "Courier",
  },
  movesLog: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: "600",
  },
  paragraph: {
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
