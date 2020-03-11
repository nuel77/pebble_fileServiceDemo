// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var worker_pb = require('./worker_pb.js');

function serialize_workerNode_addressCreation(arg) {
  if (!(arg instanceof worker_pb.addressCreation)) {
    throw new Error('Expected argument of type workerNode.addressCreation');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workerNode_addressCreation(buffer_arg) {
  return worker_pb.addressCreation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workerNode_commitment(arg) {
  if (!(arg instanceof worker_pb.commitment)) {
    throw new Error('Expected argument of type workerNode.commitment');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workerNode_commitment(buffer_arg) {
  return worker_pb.commitment.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workerNode_data(arg) {
  if (!(arg instanceof worker_pb.data)) {
    throw new Error('Expected argument of type workerNode.data');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workerNode_data(buffer_arg) {
  return worker_pb.data.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workerNode_result(arg) {
  if (!(arg instanceof worker_pb.result)) {
    throw new Error('Expected argument of type workerNode.result');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workerNode_result(buffer_arg) {
  return worker_pb.result.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workerNode_transaction(arg) {
  if (!(arg instanceof worker_pb.transaction)) {
    throw new Error('Expected argument of type workerNode.transaction');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workerNode_transaction(buffer_arg) {
  return worker_pb.transaction.deserializeBinary(new Uint8Array(buffer_arg));
}


var workerService = exports.workerService = {
  validateTransaction: {
    path: '/workerNode.worker/validateTransaction',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.transaction,
    responseType: worker_pb.transaction,
    requestSerialize: serialize_workerNode_transaction,
    requestDeserialize: deserialize_workerNode_transaction,
    responseSerialize: serialize_workerNode_transaction,
    responseDeserialize: deserialize_workerNode_transaction,
  },
  commitTransaction: {
    path: '/workerNode.worker/commitTransaction',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.transaction,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_transaction,
    requestDeserialize: deserialize_workerNode_transaction,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  validateCommitmentTransaction: {
    path: '/workerNode.worker/validateCommitmentTransaction',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.commitment,
    responseType: worker_pb.commitment,
    requestSerialize: serialize_workerNode_commitment,
    requestDeserialize: deserialize_workerNode_commitment,
    responseSerialize: serialize_workerNode_commitment,
    responseDeserialize: deserialize_workerNode_commitment,
  },
  commitCommitmentTransaction: {
    path: '/workerNode.worker/commitCommitmentTransaction',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.commitment,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_commitment,
    requestDeserialize: deserialize_workerNode_commitment,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  get: {
    path: '/workerNode.worker/Get',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.data,
    responseType: worker_pb.data,
    requestSerialize: serialize_workerNode_data,
    requestDeserialize: deserialize_workerNode_data,
    responseSerialize: serialize_workerNode_data,
    responseDeserialize: deserialize_workerNode_data,
  },
  put: {
    path: '/workerNode.worker/Put',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.data,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_data,
    requestDeserialize: deserialize_workerNode_data,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  createAddress: {
    path: '/workerNode.worker/createAddress',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.addressCreation,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_addressCreation,
    requestDeserialize: deserialize_workerNode_addressCreation,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  validateAddressCreation: {
    path: '/workerNode.worker/validateAddressCreation',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.addressCreation,
    responseType: worker_pb.addressCreation,
    requestSerialize: serialize_workerNode_addressCreation,
    requestDeserialize: deserialize_workerNode_addressCreation,
    responseSerialize: serialize_workerNode_addressCreation,
    responseDeserialize: deserialize_workerNode_addressCreation,
  },
  commitAddressCreation: {
    path: '/workerNode.worker/commitAddressCreation',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.addressCreation,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_addressCreation,
    requestDeserialize: deserialize_workerNode_addressCreation,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  getAddressData: {
    path: '/workerNode.worker/getAddressData',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.addressCreation,
    responseType: worker_pb.addressCreation,
    requestSerialize: serialize_workerNode_addressCreation,
    requestDeserialize: deserialize_workerNode_addressCreation,
    responseSerialize: serialize_workerNode_addressCreation,
    responseDeserialize: deserialize_workerNode_addressCreation,
  },
  connectPeers: {
    path: '/workerNode.worker/connectPeers',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.result,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_result,
    requestDeserialize: deserialize_workerNode_result,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  getPeerPublickey: {
    path: '/workerNode.worker/getPeerPublickey',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.result,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_result,
    requestDeserialize: deserialize_workerNode_result,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  printNodeStatus: {
    path: '/workerNode.worker/printNodeStatus',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.result,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_result,
    requestDeserialize: deserialize_workerNode_result,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
  printAddresses: {
    path: '/workerNode.worker/printAddresses',
    requestStream: false,
    responseStream: false,
    requestType: worker_pb.result,
    responseType: worker_pb.result,
    requestSerialize: serialize_workerNode_result,
    requestDeserialize: deserialize_workerNode_result,
    responseSerialize: serialize_workerNode_result,
    responseDeserialize: deserialize_workerNode_result,
  },
};

exports.workerClient = grpc.makeGenericClientConstructor(workerService);
