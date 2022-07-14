let mseSourceBuffer8
let mseStreamingStarted8 = false
const mseQueue8 = []
let ws8
  function callhls8(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming7')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws8 = new WebSocket(url)
      ws8.binaryType = 'arraybuffer'
      ws8.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws8.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer8 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer8.mode = 'segments'
          mseSourceBuffer8.addEventListener('updateend', pushPacket8)
        } else {
          readPacket8(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket8 () {

    const videoEl2 = document.querySelector('#Streaming7')
    let packet

    if (!mseSourceBuffer8.updating) {
      if (mseQueue8.length > 0) {
        packet = mseQueue8.shift()
        mseSourceBuffer8.appendBuffer(packet)
      } else {
        mseStreamingStarted8 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket8 (packet) {
    if (!mseStreamingStarted8) {
      mseSourceBuffer8.appendBuffer(packet)
      mseStreamingStarted8 = true
      return
    }
    mseQueue8.push(packet)
    if (!mseSourceBuffer8.updating) {
      pushPacket8()
    }
  }
  function StopWebSocket8()
  {
    ws8.close();
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
