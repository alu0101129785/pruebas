import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AnimatePresence, MotiView } from "moti";

export default function App() {
  const [showGreeting, setShowGreeting] = useState(false);
  const [pressCount, setPressCount] = useState(0); // Contador de clics
  const [buttonPosition, setButtonPosition] = useState({ top: 100, left: 0 }); // Posición del botón

  // Obtener el tamaño de la pantalla
  const { width, height } = Dimensions.get("window");

  // Función para manejar el clic del botón
  const handleButtonPress = () => {
    if (pressCount < 26) {
      // Calcular el tamaño del botón basándonos en el padding y el texto
      const buttonWidth = 250;  // Establecer un tamaño fijo para el botón
      const buttonHeight = 60;  // Establecer un tamaño fijo para el botón

      // Mover el botón a una nueva posición aleatoria solo en el eje vertical (top)
      setButtonPosition({
        top: Math.random() * (height - buttonHeight),  // Limitar la posición en el eje vertical
        left: (width - buttonWidth) / 2,  // Mantener el botón centrado horizontalmente
      });
      setPressCount(pressCount + 1);  // Incrementar el contador
    } else {
      // Finalmente mostrar la card cuando se llegue a 27 clics
      setShowGreeting(true);
    }
  };

  // Función para volver a la pantalla de inicio
  const goBack = () => {
    setShowGreeting(false);
    setPressCount(0);  // Reiniciar el contador de clics
  };

  // Calcular color del contador basado en el número de clics
  const counterColor = `rgb(${Math.min(255, pressCount * 10)}, 0, 0)`; // Más clics = más rojo

  // Cambiar el texto del botón según el número de clics
  const getButtonText = () => {
    if (pressCount >= 18) {
      return "Ya casi me has quitado todo el envoltorio 😏";
    } else if (pressCount >= 9) {
      return "Parece que me quieres abrir... ​🤭​";
    } else {
      return "Tienes un paquete 📦";
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón que cambia de posición */}
      {!showGreeting && (
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 1 }} // Mantener siempre visible sin parpadeo
          transition={{ type: "timing", duration: 700 }}
          style={[styles.button, { top: buttonPosition.top}]} // Aplicar la posición aleatoria
        >
          <TouchableOpacity onPress={handleButtonPress} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>{getButtonText()}</Text>
          </TouchableOpacity>
        </MotiView>
      )}

      {/* Mostrar el contador de clics */}
      {!showGreeting && (
        <Text style={[styles.counterText, { color: counterColor }]}>{pressCount}</Text>
      )}

      <AnimatePresence>
        {showGreeting && (
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 500 }}
            style={styles.card}
          >
            <Image source={require("./assets/mar.jpg")} style={styles.image} />
            <Text style={styles.text}>Para la cachorrita con la sonrisa más bonita del mundo.</Text>
            <Text style={styles.text2}>Feliz Cumpleaños</Text>
            <Text style={styles.text2}>Marsssiiitaaaaa 🎂👩‍✈️☁️</Text>
          </MotiView>
        )}
      </AnimatePresence>

      {/* Botón para volver a la pantalla de inicio, fuera de la card */}
      {showGreeting && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6" },
  buttonTouchable: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#0288d1",
  },
  buttonText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 24,
  },
  button: { 
    position: "absolute",
    padding: 0,
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    padding: 30,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 30,
  },
  image: { width: 220, height: 220, borderRadius: 110, marginBottom: 20 },
  text: { fontSize: 17, fontWeight: "bold", textAlign: "center", color: "#0288d1", marginBottom: 15 },
  text2: { fontSize: 27, fontWeight: "bold", textAlign: "center", color: "#0288d1", marginBottom: 10 },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ff4081",
    borderRadius: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  counterText: {
    fontSize: 50,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
    color: "black",
  },
});