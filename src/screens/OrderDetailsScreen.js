import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Icon, Layout } from '@ui-kitten/components';
import Moment from 'react-moment';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { updateOrder } from '../../store/actions/orderActions';

const OrderDetails = function(props) {
  const order = props.navigation.getParam('order');
  const [showModal, setShowModal] = useState(false)
  const { orderModel } = props
  const status = orderModel.statusCode.find((code) => code.id == order.status)

  const cancelOrder = async () => {
    await props.updateOrderStatus(order.id, 3)
    setShowModal(false)
  }

  const renderModalElement = () => (
    <Layout
      level='3'
      style={styles.backdrop}>
      <Layout style={styles.popUpContainer}>
        <Text style={{fontFamily: 'roboto-medium-italic', fontSize: 18}}>Heads Up</Text>
        <Text style={{fontFamily: 'roboto-regular', fontSize: 14, marginTop: 10}}>Are you sure want to cancel the appointment ?</Text>
          {orderModel.isLoading ?
            <Layout style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
              <Layout style={{marginRight: 20}}>
                <Text style={{color: 'grey'}}>Cancel</Text>
              </Layout>
              <Layout>
                <Text style={{color: 'grey'}}>Confirm</Text>
              </Layout>
            </Layout> :
            <Layout style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
              <TouchableOpacity style={{marginRight: 20}} onPress={() => setShowModal(false)}>
                <Text style={{color: 'green'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cancelOrder()}>
                <Text style={{color: 'red'}}>Confirm</Text>
              </TouchableOpacity>
            </Layout>
          }
      </Layout>
    </Layout>
  );

  const RenderOrderedItem = () => {
    if(order.cartItems && Array.isArray(order.cartItems) && order.cartItems.length) {
      return order.cartItems.map((orderItem, index) => {
        return (
          <View key={index} style={{flexDirection: 'row',justifyContent: 'space-between', paddingRight: 10, alignItems: 'center'}}>
            <Icon name='checkmark-circle-2-outline' width={12} height={12} fill="#0D5618"/>
            <Text ellipsizeMode={'tail'} numberOfLines={2} style={{width: '60%', textAlign: 'left'}}>{orderItem.item.name}</Text>
            <Text style={{width: 30}}>x {orderItem.quantity}</Text>
            <Text style={{width: 60, textAlign: 'right'}}><FontAwesome name="rupee" size={12} color="black" /> {orderItem.total_price}</Text>
          </View>
        )
    })
    } else {
      return <Text>Item no found</Text>
    }
  }
  return (
    <Layout style={{flex: 1, paddingLeft: 10, paddingRight: 10, margin: 10, borderRadius: 20}}>
      <Layout style={{padding: 10}}>
        <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 14, width: '40%'}}>Order No: {order.id}</Text>
          <Text>Status:
            <Text style={{color: status.color}}>  {status.name}</Text>
          </Text>
        </Layout>
        <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: 10}}>Placed on: </Text>
          <Moment element={Text}
              date={order.created_at}
              format="DD/MM/YYYY"
              style={{fontSize: 12, width: '100%', textAlign: 'left'}}
            />
        </Layout>
      </Layout>
      <Layout style={{paddingLeft: 10, paddingBottom: 10, borderBottomColor: '#eee', borderBottomWidth: 1}}>
        <RenderOrderedItem />
      </Layout>
      <Layout style={{padding: 10}}>
        <Layout style={{flexDirection: "row", justifyContent: 'space-between'}}>
          <Text>Total Amount</Text>
          <Text><FontAwesome name="rupee" size={12} color="black" /> {order.order_total}</Text>
        </Layout>
        <Layout style={{flexDirection: "row", justifyContent: 'space-between'}}>
          <Text>Total Paid</Text>
          <Text><FontAwesome name="rupee" size={12} color="black" /> {order.total_paid}</Text>
        </Layout>
        <Layout style={{marginTop: 10}}>
          <Text>Updates sent to:</Text>
          <Text>{props.currentUser.phone}</Text>
          {props.currentUser.email ? <Text>{props.currentUser.email}</Text> : null}
        </Layout>
        <Layout style={{marginTop: 10}}>
          <Text>Appointment Details: </Text>
          <Layout style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <Text>Booked for</Text>
            <Moment element={Text}
              date={order.appointment.from}
              format="hh:mm A, DD/MM/YYYY"
            />
          </Layout>
        </Layout>
        <Layout style={{marginTop: 30}}>
          <TouchableOpacity onPress={() => setShowModal(true)} style={{width: 130}}>
            <Text style={{color: 'red'}}>Cancel Appointment</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          return false;
        }}>
        {renderModalElement()}
      </Modal>
    </Layout>
  )
};

const mapStateToProps = state => ({
  currentUser: state.currentUser.values,
  orderModel: state.orders
})

const mapDispatchToProp = dispatch => ({
  updateOrderStatus: (order_id, order_status) => dispatch(updateOrder(order_id, order_status))
})

export default connect(mapStateToProps, mapDispatchToProp)(OrderDetails);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  popUpContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10
  }
})