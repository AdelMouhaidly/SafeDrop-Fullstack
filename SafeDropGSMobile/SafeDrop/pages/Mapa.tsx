import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationObject,
} from "expo-location";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import polyline from "@mapbox/polyline";

const ORS_API_KEY = "5b3ce3597851110001cf62483eed629c1d9d4187a68231fa7483881c";

export default function MapaComFetch() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef<MapView>(null);

  const shelters = [
    { id: 1, name: "Abrigo A", latitudeOffset: 0.001, longitudeOffset: 0.001 },
    { id: 2, name: "Abrigo B", latitudeOffset: -0.0015, longitudeOffset: 0.0005 },
    { id: 3, name: "Abrigo C", latitudeOffset: 0.002, longitudeOffset: -0.001 },
  ];

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    const watch = watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          pitch: 20,
          center: response.coords,
        });
      }
    );
    return () => {
      watch.then((sub) => sub.remove());
    };
  }, []);

  async function fetchRoute(destination: { latitude: number; longitude: number }) {
    if (!location) return;

    const body = {
      coordinates: [
        [location.coords.longitude, location.coords.latitude],
        [destination.longitude, destination.latitude],
      ],
    };

    try {
      const res = await fetch(
        "https://api.openrouteservice.org/v2/directions/foot-walking",
        {
          method: "POST",
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (
        data &&
        data.routes &&
        data.routes.length > 0 &&
        data.routes[0].geometry
      ) {
        const decodedCoords = polyline.decode(data.routes[0].geometry);

        const coords = decodedCoords.map(([lat, lon]: [number, number]) => ({
          latitude: lat,
          longitude: lon,
        }));

        setRouteCoords(coords);

        mapRef.current?.fitToCoordinates(coords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      } else {
        console.warn("Rota não encontrada", JSON.stringify(data));
        setRouteCoords([]);
      }
    } catch (err) {
      console.error("Erro ao buscar rota:", err);
      setRouteCoords([]);
    }
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você"
            pinColor="blue"
          />

          {shelters.map((shelter) => {
            const lat = location.coords.latitude + shelter.latitudeOffset;
            const lon = location.coords.longitude + shelter.longitudeOffset;
            return (
              <Marker
                key={shelter.id}
                coordinate={{ latitude: lat, longitude: lon }}
                title={shelter.name}
                onPress={() => fetchRoute({ latitude: lat, longitude: lon })}
              >
                <MaterialCommunityIcons name="home-circle" size={35} color="#196EEE" />
              </Marker>
            );
          })}

          {routeCoords.length > 0 && (
            <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="#5EA9FF" />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
