let mseSourceBuffer3
let mseStreamingStarted3 = false
const mseQueue3 = []
let ws3
  function callhls3(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming2')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws3 = new WebSocket(url)
      ws3.binaryType = 'arraybuffer'
      ws3.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws3.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer3 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer3.mode = 'segments'
          mseSourceBuffer3.addEventListener('updateend', pushPacket3)
        } else {
          readPacket3(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket3 () {

    const videoEl2 = document.querySelector('#Streaming2')
    let packet

    if (!mseSourceBuffer3.updating) {
      if (mseQueue3.length > 0) {
        packet = mseQueue3.shift()
        mseSourceBuffer3.appendBuffer(packet)
      } else {
        mseStreamingStarted3 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket3 (packet) {
    if (!mseStreamingStarted3) {
      mseSourceBuffer3.appendBuffer(packet)
      mseStreamingStarted3 = true
      return
    }
    mseQueue3.push(packet)
    if (!mseSourceBuffer3.updating) {
      pushPacket3()
    }
  }
  function StopWebSocket3()
  {
    ws3.close();
   console.log("Websocket Close")
  }
  // const videoEl = document.querySelector('#mse-video')
  

  // fix stalled video in safari
  // videoEl.addEventListener('pause', () => {
  //   if (videoEl.currentTime > videoEl.buffered.end(videoEl.buffered.length - 1)) {
  //     videoEl.currentTime = videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1
  //     videoEl.play()
  //   }
  // })
