let mseSourceBuffer11
let mseStreamingStarted11 = false
const mseQueue11 = []
let ws11
  function callhls11(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming10')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws11 = new WebSocket(url)
      ws11.binaryType = 'arraybuffer'
      ws11.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws11.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer11 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer11.mode = 'segments'
          mseSourceBuffer11.addEventListener('updateend', pushPacket11)
        } else {
          readPacket11(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket11 () {

    const videoEl2 = document.querySelector('#Streaming10')
    let packet

    if (!mseSourceBuffer11.updating) {
      if (mseQueue11.length > 0) {
        packet = mseQueue11.shift()
        mseSourceBuffer11.appendBuffer(packet)
      } else {
        mseStreamingStarted11 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket11 (packet) {
    if (!mseStreamingStarted11) {
      mseSourceBuffer11.appendBuffer(packet)
      mseStreamingStarted11 = true
      return
    }
    mseQueue11.push(packet)
    if (!mseSourceBuffer11.updating) {
      pushPacket11()
    }
  }
  function StopWebSocket11()
  {
    ws11.close();
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
