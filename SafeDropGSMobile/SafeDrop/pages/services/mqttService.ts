import mqtt from 'mqtt';


const MQTT_BROKER = 'broker.hivemq.com';
const MQTT_PORT = 8000; 
const MQTT_CLIENT_ID = `safedrop_mobile_${Math.random().toString(16).substring(2, 10)}`;

const TOPICS = {
  ENCHENTE: 'SafeDrop/Enchente/Nivel',
  TEMPERATURA_UMIDADE: 'SafeDrop/TemperaturaUmidade',
  VIBRACAO: 'SafeDrop/Vibracao'
};

class MQTTService {
  client: any;
  isConnected: boolean = false;
  messageCallbacks: Map<string, Function[]> = new Map();
  connectionAttempts: number = 0;
  maxConnectionAttempts: number = 3;

  connect() {
    return new Promise((resolve, reject) => {
      try {
        if (this.isConnected && this.client) {
          console.log('MQTT já está conectado');
          resolve(true);
          return;
        }

    
        this.connectionAttempts++;
        
        
        const connectUrl = `ws://${MQTT_BROKER}:${MQTT_PORT}/mqtt`;
        
        this.client = mqtt.connect(connectUrl, {
          clientId: MQTT_CLIENT_ID,
          clean: true,
          connectTimeout: 4000,
          reconnectPeriod: 1000,
        });

        this.client.on('connect', () => {
          console.log('Conectado ao broker MQTT');
          this.isConnected = true;
          this.connectionAttempts = 0; 
          
          
          Object.values(TOPICS).forEach(topic => {
            this.client.subscribe(topic, (err: any) => {
              if (err) {
                console.error(`Erro ao se inscrever no tópico ${topic}:`, err);
              } else {
                console.log(`Inscrito no tópico: ${topic}`);
              }
            });
          });
          
          resolve(true);
        });

        this.client.on('error', (err: any) => {
          console.error('Erro de conexão MQTT:', err);
          this.isConnected = false;
          
          
          if (this.connectionAttempts >= this.maxConnectionAttempts) {
            reject(err);
          } else {
            
            setTimeout(() => {
              this.connect().then(resolve).catch(reject);
            }, 2000);
          }
        });

        this.client.on('message', (topic: string, message: Buffer) => {
          const messageStr = message.toString();
          console.log(`Mensagem recebida no tópico ${topic}: ${messageStr}`);
          
          try {
            const data = JSON.parse(messageStr);
            
            
            if (this.messageCallbacks.has(topic)) {
              const callbacks = this.messageCallbacks.get(topic) || [];
              callbacks.forEach(callback => callback(data));
            }
          } catch (error) {
            console.error('Erro ao processar mensagem MQTT:', error);
          }
        });
      } catch (error) {
        console.error('Erro ao inicializar conexão MQTT:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.client && this.isConnected) {
      this.client.end();
      this.isConnected = false;
      console.log('Desconectado do broker MQTT');
    }
  }

  subscribe(topic: string, callback: Function) {
    if (!this.messageCallbacks.has(topic)) {
      this.messageCallbacks.set(topic, []);
    }
    
    const callbacks = this.messageCallbacks.get(topic) || [];
    callbacks.push(callback);
    this.messageCallbacks.set(topic, callbacks);
    
    return () => {
      
      const updatedCallbacks = (this.messageCallbacks.get(topic) || []).filter(cb => cb !== callback);
      this.messageCallbacks.set(topic, updatedCallbacks);
    };
  }


  isReceivingMessages() {
    return this.isConnected;
  }
}

export { TOPICS };
export default new MQTTService();