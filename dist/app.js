'use strict';

var _cmmcMqtt = require('cmmc-mqtt');

var mqttClient1 = _cmmcMqtt.mqtt.create('mqtt://q.cmmc.io:51883', ['PROXY/MESH/1']);
var mqttClient2 = _cmmcMqtt.mqtt.create('mqtt://q.cmmc.io:51883');

mqttClient1.register('on_message', function (topic, payload) {
  // logger.info(`[app] on_message topic = ${topic}`)
  // logger.info(`myName = ${JSON.parse(payload.toString()).d.myName}`)
  // console.log(`[app] on_message payload = ${payload}`)
}).forward(mqttClient2, {
  prefix: 'MARU/',
  fn: function fn(prefix, topic, message, packet) {
    var object = void 0;
    var retain = void 0,
        qos = void 0;
    try {
      object = JSON.parse(message.toString());
      object.info.prefix = prefix;
      object.info.device_id = object.d.myName;
      object.d.myName = object.d.codeName || object.d.myName;
      var _ref = [packet.retain || true, packet.qos];
      retain = _ref[0];
      qos = _ref[1];
    } catch (err) {
      return {
        topics: ['error'],
        payload: JSON.stringify({ info: {}, d: {}, err: message.toString() })
      };
    }
    return {
      topics: ['' + prefix + object.d.myName + '/status'],
      payload: JSON.stringify(object),
      options: { retain: retain, qos: qos }
    };
  }
});