const rawData = [
  3869.47,
  3941.2167,
  3832.155,
  3863.6267,
  3835.5983,
  4083.165,
  4041.4583,
  4029.9917,
  4028.2917,
  3669.5825,
  3660.9583,
  3658.6725,
  3540.1583,
  3706.1725,
  3604.1333,
  3630.2567,
  3665.41,
  3630.785,
  3708.9633,
  3552.8933,
  3548.69,
  3598.2183,
  3576.01,
  3598.2717,
  3582.2,
  3580.775,
  3553.0133,
  3454.48,
  3421.12,
  3482.3,
  3441.985
]

function getMin(raw) {
  return Math.min(...raw);
}

const min = getMin(rawData);

function scaleDown(step) {
  return step / min;
}

function scaleUp(step) {
  return step * min;
}

const scaledData = rawData.map(scaleDown)
console.log(scaledData)

const traininData = [
  scaledData.slice(0, 5),
  scaledData.slice(5, 10),
  scaledData.slice(10, 15),
  scaledData.slice(15,20),
  scaledData.slice(20, 25),
  scaledData.slice(25, 30),
  scaledData.slice(30, 31)
]
console.log(traininData)

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 1,
  hiddenLayers: [2, 2],
  outputSize: 1
});

net.train(traininData, {
  learningRate: 0.005,
  errorThresh: 0.02,
})

console.log(scaleUp(net.run(traininData[0])));