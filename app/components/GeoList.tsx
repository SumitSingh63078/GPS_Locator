import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../Colors.utils';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import EmptyPlaceholder from './EmptyPlaceholder';
import PersistentStorage from '../PersistentStorage';
import { STORAGE_KEYS } from '../constants';
import Divider from './Divider';
import GeoListStyles from './GeoListStyles';

interface GeoListDataType extends GeoCoordinates {
  id: number;
}

const GeoList = () => {
  const [grantedPermission, setGrantedPermission] = useState(false);
  const [geoListData, setGeoListData] = useState<GeoListDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<GeoListDataType>();

  const addAddress = async () => {
    if (grantedPermission) {
      setLoading(true);
      try {
        let coords = await getCurrentLocation();
        const newData = [...geoListData, { id: Date.now(), ...coords }];
        setGeoListData(newData);
        persistData(newData);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Could not fetch location');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Permission Denied', 'Please grant permission to access your location');
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setGrantedPermission(true);
      } else {
        console.log('Location permission denied');
      }
    } else {
      setGrantedPermission(true);
    }
  };

  const getCurrentLocation = () => {
    return new Promise<GeoCoordinates>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          reject(new Error(error.message));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  };

  const deleteGeoItem = async (id: number) => {
    const newData = geoListData.filter(item => item.id !== id);
    setGeoListData(newData);
    await persistData(newData);
  };

  const persistData = async (newData: GeoListDataType[]) => {
    try {
      await PersistentStorage.setItem(STORAGE_KEYS.GEO_LIST, newData);
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    try {
      const data: GeoListDataType[] =
        (await PersistentStorage.getItem(STORAGE_KEYS.GEO_LIST)) ?? [];
      if (data) {
        setGeoListData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    requestLocationPermission();
  }, []);

  const ListItem = ({ item }: { item: GeoListDataType }) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => {
          setSelectedAddress(item);
          setShowAddress(true);
        }}>
        <Image style={styles.listItemImage} source={require('../assets/cloud-icon.png')} />
        <Text numberOfLines={1} style={styles.listItemText}>
          {item.latitude}, {item.longitude}
        </Text>
        <TouchableOpacity onPress={() => deleteGeoItem(item.id)}>
          <Image style={styles.trashIcon} source={require('../assets/trash.png')} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {geoListData.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <FlatList
          data={geoListData}
          renderItem={ListItem}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={Divider}
        />
      )}

      {loading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator animating color={Colors.white} />
        </View>
      ) : (
        <TouchableOpacity onPress={addAddress} style={styles.addButton}>
          <Image style={styles.addIcon} source={require('../assets/plus-icon.png')} />
        </TouchableOpacity>
      )}
      <Modal
        transparent
        animationType="slide"
        visible={showAddress}
        onRequestClose={() => setShowAddress(false)}>
        <Pressable onPress={() => setShowAddress(false)} style={styles.modalOverlay} />
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Address Details</Text>
            <TouchableOpacity onPress={() => setShowAddress(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Divider margin={10} />
          <Text>Latitude: {selectedAddress?.latitude ?? "NA"}</Text>
          <Text>Longitude: {selectedAddress?.longitude ?? "NA"}</Text>
          <Text>Accuracy: {selectedAddress?.accuracy ?? "NA"}</Text>
          <Text>Altitude: {selectedAddress?.altitude ?? "NA"}</Text>
          <Text>Heading: {selectedAddress?.heading ?? "NA"}</Text>
          <Text>Speed: {selectedAddress?.speed ?? "NA"}</Text>
          <Text>Altitude Accuracy: {selectedAddress?.altitudeAccuracy ?? "NA"}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default GeoList;

const styles = GeoListStyles
