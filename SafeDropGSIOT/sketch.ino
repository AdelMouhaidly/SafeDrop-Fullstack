#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";

const char* mqtt_server = "broker.hivemq.com";

const char* topico_enchente = "SafeDrop/Enchente/Nivel";
const char* topico_temp_umid = "SafeDrop/TemperaturaUmidade";
const char* topico_vibracao = "SafeDrop/Vibracao";

#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

int pinoNivel = 32;     
int pinoVibracao = 33;  

bool ethernetConnected = false;
bool wifiConnected = false;

WiFiClient wifiClient;
PubSubClient client(wifiClient);

LiquidCrystal_I2C lcd(0x27, 16, 2);

bool useEthernet = false;  
unsigned long lastSwitchTime = 0;
const unsigned long switchInterval = 30000; 

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando no WiFi ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println(WiFi.localIP());
  wifiConnected = true;
}

void setup_ethernet() {
  Serial.println("Simulando conexão Ethernet no Wokwi...");
  delay(2000);
  
  if (useEthernet) {
    Serial.println("Ethernet simulado conectado");
    Serial.println("IP simulado: 192.168.1.100");
    ethernetConnected = true;
  } else {
    Serial.println("Ethernet simulado desconectado");
    ethernetConnected = false;
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conexão MQTT...");
    if (client.connect("SafeDropESP32")) {
      Serial.println("Conectado ao broker MQTT.");
    } else {
      Serial.print("Falhou, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 2 segundos.");
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("SafeDrop Init");

  // No Wokwi, para iniciar com WiFi
  setup_wifi();
  
  // Simular Ethernet para demonstração
  setup_ethernet();
  
  
  client.setServer(mqtt_server, 1883);

  pinMode(pinoNivel, INPUT);
  pinMode(pinoVibracao, INPUT);
}

void loop() {
  
  unsigned long currentTime = millis();
  if (currentTime - lastSwitchTime > switchInterval) {
    lastSwitchTime = currentTime;
    useEthernet = !useEthernet;
    
    if (useEthernet) {
      ethernetConnected = true;
      Serial.println("Alternando para conexão Ethernet (simulado)");
    } else {
      ethernetConnected = false;
      Serial.println("Alternando para conexão WiFi");
    }
    
    setup_ethernet();
  }
  
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  int valorNivel = analogRead(pinoNivel);
  int nivelAgua = map(valorNivel, 0, 4095, 0, 100);

  String payloadEnchente = "{\"nivel_agua\": " + String(nivelAgua) + "}";
  client.publish(topico_enchente, (char*) payloadEnchente.c_str());
  Serial.println("Enviado Enchente: " + payloadEnchente);

  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Falha na leitura do sensor DHT!");
  } else {
    String payloadTemp = "{\"temperatura\": " + String(temperatura) + ", \"umidade\": " + String(umidade) + "}";
    client.publish(topico_temp_umid, (char*) payloadTemp.c_str());
    Serial.println("Enviado Temp/Umidade: " + payloadTemp);
  }

  int valorVib = analogRead(pinoVibracao);
  int vibracao = map(valorVib, 0, 4095, 0, 100);

  String payloadVib = "{\"vibracao\": " + String(vibracao) + "}";
  client.publish(topico_vibracao, (char*) payloadVib.c_str());
  Serial.println("Enviado Vibracao: " + payloadVib);

  lcd.clear();
  
  String conexao = ethernetConnected ? "ETH" : (wifiConnected ? "WiFi" : "Desconectado");
  
  if (nivelAgua > 80) {
    lcd.print("ALERTA: ENCHENTE");
    lcd.setCursor(0, 1);
    lcd.print("Conexao: " + conexao);
  } else if (temperatura > 35) {
    lcd.print("ALERTA: CALOR");
    lcd.setCursor(0, 1);
    lcd.print("Conexao: " + conexao);
  } else if (vibracao > 70) {
    lcd.print("ALERTA: VIBRACAO");
    lcd.setCursor(0, 1);
    lcd.print("Conexao: " + conexao);
  } else {
    lcd.print("Sistema OK");
    lcd.setCursor(0, 1);
    lcd.print(conexao + " T:" + String(temperatura));
  }

  delay(5000);
}