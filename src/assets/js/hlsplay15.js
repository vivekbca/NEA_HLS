let mseSourceBuffer15
let mseStreamingStarted15 = false
const mseQueue15 = []
let ws15
  function callhls15(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming14')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws15 = new WebSocket(url)
      ws15.binaryType = 'arraybuffer'
      ws15.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws15.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer15 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer15.mode = 'segments'
          mseSourceBuffer15.addEventListener('updateend', pushPacket15)
        } else {
          readPacket15(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket15 () {

    const videoEl2 = document.querySelector('#Streaming14')
    let packet

    if (!mseSourceBuffer15.updating) {
      if (mseQueue15.length > 0) {
        packet = mseQueue15.shift()
        mseSourceBuffer15.appendBuffer(packet)
      } else {
        mseStreamingStarted15 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket15 (packet) {
    if (!mseStreamingStarted15) {
      mseSourceBuffer15.appendBuffer(packet)
      mseStreamingStarted15 = true
      return
    }
    mseQueue15.push(packet)
    if (!mseSourceBuffer15.updating) {
      pushPacket15()
    }
  }
  function StopWebSocket15()
  {
    ws15.close();
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
