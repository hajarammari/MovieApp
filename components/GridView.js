import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  Alert,
} from 'react-native';

const GridView = props => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.gridBox}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image style={styles.imgStyle} source={{uri: props.pic}} />
      </Pressable>

      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.title}</Text>
            <Text style={styles.modalText}>{props.date}</Text>
            <Text style={styles.modalOverview}>{props.overview}</Text>
            <Image style={{width:200, height:300}} source={{uri: props.pic}} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* fin modal */}
    </View>
  );
};

const styles = StyleSheet.create({
  gridBox: {
    flex: 1,
    height: 300,
    margin: 2,
    elevation: 5,
  },
  imgStyle: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontWeight:'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  modalOverview: {
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'center',
  },

});

/* The default keyword indicates that when importing the module,
if no specific member or identifier is specified to import,
the default export will be imported by default.
This allows for a more convenient way of importing and using
the component in other parts of the application. */
export default GridView;
