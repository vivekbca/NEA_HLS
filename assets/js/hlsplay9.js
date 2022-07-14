let mseSourceBuffer9
let mseStreamingStarted9 = false
const mseQueue9 = []
let ws9
  function callhls9(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming8')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws9 = new WebSocket(url)
      ws9.binaryType = 'arraybuffer'
      ws9.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws9.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer9 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer9.mode = 'segments'
          mseSourceBuffer9.addEventListener('updateend', pushPacket9)
        } else {
          readPacket9(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket9 () {

    const videoEl2 = document.querySelector('#Streaming8')
    let packet

    if (!mseSourceBuffer9.updating) {
      if (mseQueue9.length > 0) {
        packet = mseQueue9.shift()
        mseSourceBuffer9.appendBuffer(packet)
      } else {
        mseStreamingStarted9 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket9 (packet) {
    if (!mseStreamingStarted9) {
      mseSourceBuffer9.appendBuffer(packet)
      mseStreamingStarted9 = true
      return
    }
    mseQueue9.push(packet)
    if (!mseSourceBuffer9.updating) {
      pushPacket9()
    }
  }
  function StopWebSocket9()
  {
    ws9.close();
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
