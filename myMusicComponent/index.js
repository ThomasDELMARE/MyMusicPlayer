import "./libs/webaudio-controls.js";

const getBaseURL = () => {
    return new URL(".",
        import.meta.url);
};

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
      canvas {
        border: 1px solid;
        margin-bottom: 10px;
      }
      
      webaudio-knob {
        margin: 10px;
      }

      .equalizer {
        margin-top: 20px;
      }

      .freq {
        margin-right: 20px;
      }

      .main {
        margin: 32px;
        border:1px solid;
        border-radius:15px;
        background-color:rgb(86,77,77);
        padding:10px;
        margin:auto;
        width:500px;
        box-shadow: 10px 10px 5px lightgrey;
        text-align:center;
        font-family: "Open Sans";
        font-size: 14px;
      }
      
      .progressLabel{
        display:flex;
        flex-direction:row;
        justify-content: center;
        align-items: center;
        color:white;
        margin-bottom:10px;
        margin-top: 10px;
      }

      .controls-knobs{
        display:flex;
        justify-content: center;
        color:white;
        margin-bottom:10px;
      }

      .row {
        display:flex;
        flex-direction:row;
        justify-content: center;
        align-items: center;
      }

      .mainTitle {
        text-decoration:underline;
        color: white;
      }

      #vitesse {
        position: relative;
      }

      #musicSpeed {
        position: relative;
        top: 3px
      }

      #maxSpeed {
        position: relative;
        top: 2px
      }

      #freqDiv {
        background:white
      }

      #volumeMeter {
        background:white
      }

      #audioGraph {
        background:white
      }
      
      #mp3Uploader {
        margin-top: 20px
      }

      #previous {
        width:41px;
        height:40px;
      }

      #lightPrevious {
        width:41px;
        height:40px;
      }

      #playPause{
        width:75px;
        height:40px;
      }

      #lightNext{
        width:41px;
        height:40px;
      }

      #next{
        width:41px;
        height:40px;
      }

      #stop{
        width:41px;
        height:40px;
      }

    </style>
    
    <div class="main">
      <audio id="monAudio" crossorigin="anonymous"></audio>
      <div class="mainTitle">
      <span id="songTitle"></span>
    </div>

    <div class="progressLabel">
      <label> Progression
        <input class="musicProgress" id="musicProgress" type="range" disabled value=0>
      </label>
      <span id="currentTime"></span> /
      <span id="duration"></span>
    </div>
    
    <div class="controls-knobs">
      <label id="speed"> Vitesse 
        <input class="musicSpeed" style="margin-bottom:0px" id="musicSpeed" type="range" min=0.2 max=4 step=0.1 value=1>
      </label>
      <output id="maxSpeed">1</output>
       
    </div>

    <div class="row">
        <div>
          <canvas id="freqDiv" width=400 height=100></canvas>
          <canvas id="audioGraph" width=400 height=100></canvas>
        </div>
        <div>
          <canvas id="volumeMeter" width="51" height="150px"></canvas>
        </div>
      </div>

      
      <!-- Boutons d'action -->
      <div class="controls">
        <img id="previous" src="myMusicComponent/assets/imgs/buttons/previous.png">
        <img id="lightPrevious" src="myMusicComponent/assets/imgs/buttons/lightPrevious.png">
        <img id="playPause" src="myMusicComponent/assets/imgs/buttons/playPause.png">
        <img id="lightNext" src="myMusicComponent/assets/imgs/buttons/lightNext.png">
        <img id="next" src="myMusicComponent/assets/imgs/buttons/next.png">
        <img id="stop" src="myMusicComponent/assets/imgs/buttons/stop.png">
      </div>

      <div class="equalizer">
        <webaudio-knob id="volumeKnob" 
            src="myMusicComponent/assets/imgs/knobVolumeBalance.png" 
            value=5 min=0 max=20 step=0.01 
            diameter="32" 
            tooltip="Volume: %d">
        </webaudio-knob>
        
        <webaudio-slider class="freq" id="freq_60" 
          src="myMusicComponent/assets/imgs/sliderBody.png" 
          knobsrc="myMusicComponent/assets/imgs/sliderKnob.png" 
          value="1" min="-30" max="30" step="0.1" basewidth="24" 
          baseheight="128" knobwidth="24" knobheight="24" ditchlength="100" tooltip="freq 60hz"
          >
        </webaudio-slider>

        <webaudio-slider class="freq" id="freq_170" 
          src="myMusicComponent/assets/imgs/sliderBody.png" 
          knobsrc="myMusicComponent/assets/imgs/sliderKnob.png" 
          value="1" min="-30" max="30" step="0.1" basewidth="24" 
          baseheight="128" knobwidth="24" knobheight="24" ditchlength="100" tooltip="freq 170hz"
          >
        </webaudio-slider>

        <webaudio-slider class="freq" id="freq_350" 
          src="myMusicComponent/assets/imgs/sliderBody.png" 
          knobsrc="myMusicComponent/assets/imgs/sliderKnob.png" 
          value="1" min="-30" max="30" step="0.1" basewidth="24" 
          baseheight="128" knobwidth="24" knobheight="24" ditchlength="100" tooltip="freq 350hz"
          >
        </webaudio-slider>

        <webaudio-slider class="freq" id="freq_1000" 
          src="myMusicComponent/assets/imgs/sliderBody.png" 
          knobsrc="myMusicComponent/assets/imgs/sliderKnob.png" 
          value="1" min="-30" max="30" step="0.1" basewidth="24" 
          baseheight="128" knobwidth="24" knobheight="24" ditchlength="100" tooltip="freq 1000hz"
          >
        </webaudio-slider>

        <webaudio-slider class="freq" id="freq_3500" 
          src="myMusicComponent/assets/imgs/sliderBody.png" 
          knobsrc="myMusicComponent/assets/imgs/sliderKnob.png" 
          value="1" min="-30" max="30" step="0.1" basewidth="24" 
          baseheight="128" knobwidth="24" knobheight="24" ditchlength="100" tooltip="freq 3500hz"
          >
        </webaudio-slider>

        <webaudio-slider class="freq" id="freq_10000" 
          src="myMusicComponent/assets/imgs/sliderBody.png" 
          knobsrc="myMusicComponent/assets/imgs/sliderKnob.png" 
          value="1" min="-30" max="30" step="0.1" basewidth="24" 
          baseheight="128" knobwidth="24" knobheight="24" ditchlength="100" tooltip="freq 10000hz"
          >
        </webaudio-slider>

        <webaudio-knob id="balanceKnob" 
            src="myMusicComponent/assets/imgs/knobVolumeBalance.png" 
            value=0 min=-1 max=1 step=0.1 
            diameter="32" 
            tooltip="Balance">
        </webaudio-knob>

        <!-- Je l'ai laissé car c'est une fonctionnalité que j'ai commencé à faire et qui m'a pris du temps (cf le code en dessous) !--> 
        <!-- ><input type="file" id="mp3Uploader" multiple/> --!>

      </div>

    </div>
  `;

class myMusicPlayer extends HTMLElement {
    musicPlaying = false;
    mapSlider = new Map();

    // Chemin des musiques au format mp3
    songs = [
        "http://mainline.i3s.unice.fr/mooc/LaSueur.mp3",
        "myMusicComponent/assets/musics/xGonGiveItToYa.mp3",
        "myMusicComponent/assets/musics/radioactive.mp3",
        "myMusicComponent/assets/musics/billieJean.mp3",
        "myMusicComponent/assets/musics/highwayToHell.mp3",
        "myMusicComponent/assets/musics/nightcall.mp3"
    ];
    index = 0;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("URL de base du composant : " + getBaseURL());
    }

    connectedCallback() {
        // Clone et ajoute le template dans le DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // On définit d'abord les shadowElements PUIS on leur met des valeurs
        this.defineShadowElements();
        this.setInitialsValues();
        this.fixRelativeURLs();

        // Définition des écouteurs 
        this.defineListeners();
        this.defineListenerSlider();
    }

    fixRelativeURLs() {
      // On récupère les élements qui nous intéressent
        const elems = this.shadowRoot.querySelectorAll(
            "webaudio-knob, webaudio-slider, webaudio-switch, img"
        );
        elems.forEach((e) => {
            const path = e.src;
            if (path.startsWith(".")) {
                e.src = getBaseURL() + path;
            }
        });
    }

    defineListeners() {
      // On définit les listeners pour chaque bouton
        this.playPauseButton.onclick = (event) => {
            // Permet de faire un play/pause au lieu de deux boutons pour play ET pause
            if (this.musicPlaying == true) {
                this.musicPlaying = false
                this.player.pause();
            } else {
                this.musicPlaying = true
                this.player.play();
            }
        };

        this.stopButton.onclick = () => {
            this.player.load();
        };

        this.forward10Secs.onclick = () => {
            this.player.currentTime += 10;
        };

        this.backward10Secs.onclick = () => {
            this.player.currentTime -= 10;
        };

        this.readSpeed.oninput = (event) => {
            var value = parseFloat(event.target.value);
            this.player.playbackRate = value;
            this.readSpeedLabel.value = value;
        };

        this.volumeKnob.oninput = (event) => {
            var value = parseFloat(event.target.value);
            this.player.volume = this.normalizeVolume(value);
        };

        this.balanceKnob.oninput = (event) => {
            this.stereoPannerNode.pan.value = event.target.value;
        };

        this.next.onclick = (event) => {
            this.nextSong();
        };

        this.previous.onclick = (event) => {
            this.previousSong();
        };

        this.player.ontimeupdate = (event) => {
            this.progressBarUpdate();
        };

        this.player.onplay = (event) => {
            if (this.audioContext === undefined) {
                this.audioContext = new AudioContext();

                this.buildAudioGraph();

                requestAnimationFrame(() => {
                    this.drawAudio();
                    this.drawAudioFrequence();
                    this.drawVolume();
                });
            }
        };

        // J'ai décidé de laisser cette partie de code car j'avais essayé de faire un upload de fichier mp3 mais il semblerait que ça repousse les droits que les navigateurs
        // La solution envisageable serait de les upload sur un serveur et de les récupérer depuis le serveur.
        // this.mp3Uploader.onchange = (event) => {
        //     for (var i = 0; i < event.target.files.length; ++i) {
        //         var mp3Name = event.target.files.item(i).name;
        //         let mp3 = event.target.files.item(i);

        //         // let formData = new FormData();
        //         // fetch("myMusicComponent/assets/musics/"+ mp3Name + ".mp3", { method: "POST", body: mp3 });
        //     }
        // }
    }

    defineShadowElements() {
      // On récupère l'ensemble des éléments
        this.player = this.shadowRoot.querySelector("#monAudio");
        this.player.src = this.getAttribute("src");

        this.playPauseButton = this.shadowRoot.querySelector("#playPause");
        this.stopButton = this.shadowRoot.querySelector("#stop");
        this.forward10Secs = this.shadowRoot.querySelector("#lightNext");
        this.backward10Secs = this.shadowRoot.querySelector("#lightPrevious");
        this.next = this.shadowRoot.querySelector("#next");
        this.previous = this.shadowRoot.querySelector("#previous");
        this.readSpeed = this.shadowRoot.querySelector("#musicSpeed");
        this.readSpeedLabel = this.shadowRoot.querySelector("#maxSpeed");

        this.titleLabel = this.shadowRoot.querySelector("#songTitle");

        this.progressSlider = this.shadowRoot.querySelector("#musicProgress");
        this.currentTimeSpan = this.shadowRoot.querySelector("#currentTime");
        this.durationSpan = this.shadowRoot.querySelector("#duration");

        this.balanceKnob = this.shadowRoot.querySelector("#balanceKnob");
        this.volumeKnob = this.shadowRoot.querySelector("#volumeKnob");

        this.slider60 = this.shadowRoot.querySelector("#freq_60");
        this.slider170 = this.shadowRoot.querySelector("#freq_170");
        this.slider350 = this.shadowRoot.querySelector("#freq_350");
        this.slider1000 = this.shadowRoot.querySelector("#freq_1000");
        this.slider3500 = this.shadowRoot.querySelector("#freq_3500");
        this.slider10000 = this.shadowRoot.querySelector("#freq_10000");

        this.freqCanvas = this.shadowRoot.querySelector("#freqDiv");
        this.freqCanvasCtx = this.freqCanvas.getContext("2d");
        this.audioCanvas = this.shadowRoot.querySelector("#audioGraph");
        this.audioCanvasContext = this.audioCanvas.getContext("2d");
        this.volumeCanvas = this.shadowRoot.querySelector("#volumeMeter");
        this.volumeCanvasContext = this.volumeCanvas.getContext("2d");

        this.mp3Uploader = this.shadowRoot.querySelector("#mp3Uploader")

        this.gradient = this.volumeCanvasContext.createLinearGradient(
            0,
            0,
            0,
            this.volumeCanvas.height
        );
        this.gradient.addColorStop(1, "rgb(147,112,219)");
        this.gradient.addColorStop(0.75, "rgb(138,43,226)");
        this.gradient.addColorStop(0.25, "#48D1CC");
        this.gradient.addColorStop(0, "#00CED1");
    }

    setInitialsValues() {
      // On met des valeurs initiales pour le volume
      this.player.volume = this.normalizeVolume(5);
      this.updateSongTitle();
    }

    updateSongTitle() {
      var lastIndex = this.player.src.lastIndexOf("/");
      this.titleLabel.innerHTML = this.player.src.substr(lastIndex + 1);
    }

    nextSong() {
        // On vérifie si on ne revient pas à la dernière chanson
        if (this.index + 1 > this.songs.length - 1) {
          this.index = 0;
        } 
        // On passe à la chanson suivante sinon
        else {
            this.index += 1;
        }
        this.player.src = this.songs[this.index];
        console.log("Type of : ", typeof this.player.src)
        this.updateSongTitle();
    }

    previousSong() {
        if (this.index - 1 < 0) {
            this.index = this.songs.length - 1;
        } else {
            this.index -= 1;
        }
        this.player.src = this.songs[this.index];
        this.updateSongTitle();
    }

    progressBarUpdate() {
        // On récupère les données de la musique actuelle
        let currentTime = this.player.currentTime;
        let duration = this.player.duration;

        // On affecte les bonnes valeurs selon les valeurs récupérées
        this.progressSlider.max = duration;
        this.progressSlider.value = currentTime;
        
        this.progressSlider.min = 0;
        this.currentTimeSpan.innerHTML = this.convertElapsedTime(currentTime);
        
        // Si la musique ne joue plus, alors on met le timer à 0:00
        if (this.musicPlaying == false) {
            this.durationSpan.innerHTML = "0:00"
        }
        else {
            this.durationSpan.innerHTML = this.convertElapsedTime(duration);
        }
    }

    // Convertit les secondes en format MIN:SEC
    convertElapsedTime(inputSeconds) {
        let seconds = Math.floor(inputSeconds % 60);
        let minutes = Math.floor(inputSeconds / 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    normalizeVolume(value) {
        var old_value = value;
        
        var old_min = 0;
        var old_max = 20;

        var new_min = 0;
        var new_max = 1;

        var new_value =
            ((old_value - old_min) / (old_max - old_min)) * (new_max - new_min) +
            new_min;

        return new_value;
    }

    // Code permettant d'initialiser/maj le graph audio
    buildAudioGraph() {
        let sourceNode = this.audioContext.createMediaElementSource(this.player);
        this.analyserNode = this.audioContext.createAnalyser();
        this.stereoPannerNode = this.audioContext.createStereoPanner();
        sourceNode.connect(this.stereoPannerNode);

        this.buildSliders(this.audioContext);

        this.analyserNode.fftSize = 2048;
        this.sizeBuffer = this.analyserNode.frequencyBinCount;
        this.dataTable = new Uint8Array(this.sizeBuffer);

        let currentNode = sourceNode;
        for (let filter of this.mapSlider.values()) {
            currentNode.connect(filter);
            currentNode = filter;
        }

        currentNode.connect(this.stereoPannerNode);
        this.stereoPannerNode.connect(this.analyserNode);
        this.analyserNode.connect(this.audioContext.destination);

        // Pour l'analyseur gauche
        this.analyserLeft = this.audioContext.createAnalyser();
        this.analyserLeft.fftSize = 256;
        this.sizeBufferLeft = this.analyserLeft.frequencyBinCount;
        this.dataTableLeft = new Uint8Array(this.sizeBufferLeft);

        // Pour l'analyseur droit
        this.analyserRight = this.audioContext.createAnalyser();
        this.analyserRight.fftSize = 256;
        this.sizeBufferRight = this.analyserRight.frequencyBinCount;
        this.dataTableRight = new Uint8Array(this.sizeBufferRight);

        this.splitter = this.audioContext.createChannelSplitter();
        this.stereoPannerNode.connect(this.splitter);
        this.splitter.connect(this.analyserLeft, 0, 0);
        this.splitter.connect(this.analyserRight, 1, 0);
    }

    buildSliders(context) {
        var type = "peaking";
        var filters = [60, 170, 350, 1000, 3500, 10000];

        filters.forEach((val) => {
            const slider = context.createBiquadFilter();
            slider.frequency.value = val;
            slider.type = type;
            slider.gain.value = 0;
            this.mapSlider.set(val, slider);
        });
    }

    setGainOfSlider(key, value) {
        var val = parseFloat(value);
        const filter = this.mapSlider.get(key);
        if (filter !== undefined)
        {
          filter.gain.value = val;
        }
    }

    defineListenerSlider() {
        this.slider60.oninput = (event) => {
            this.setGainOfSlider(60, event.target.value);
        };
        this.slider170.oninput = (event) => {
            this.setGainOfSlider(170, event.target.value);
        };
        this.slider350.oninput = (event) => {
            this.setGainOfSlider(350, event.target.value);
        };
        this.slider1000.oninput = (event) => {
            this.setGainOfSlider(1000, event.target.value);
        };
        this.slider3500.oninput = (event) => {
            this.setGainOfSlider(3500, event.target.value);
        };
        this.slider10000.oninput = (event) => {
            this.setGainOfSlider(10000, event.target.value);
        };
    }

    drawAudioFrequence() {
      // On réinitialise le graph
      let barHeigth;
      this.freqCanvasCtx.clearRect(
            0,
            0,
            this.freqCanvas.width,
            this.freqCanvas.height
        );

        this.analyserNode.getByteFrequencyData(this.dataTable);

        this.freqCanvasCtx.fillStyle = "white";
        this.freqCanvasCtx.fillRect(
            0,
            0,
            this.freqCanvas.width,
            this.freqCanvas.height
        );

        let barWidth = this.freqCanvas.width / this.sizeBuffer;
        var x = 0;

        let heightScale = this.freqCanvas.height / 128;

        for (let i = 0; i < this.sizeBuffer; i++) {
            barHeigth = this.dataTable[i];

            this.freqCanvasCtx.fillStyle = "rgb(75,0," + (barHeigth + 100) + ")";
            barHeigth *= heightScale;
            this.freqCanvasCtx.fillRect(
                x,
                this.freqCanvas.height - barHeigth / 2,
                barWidth,
                barHeigth / 2
            );

            x += barWidth + 1;
        }

        requestAnimationFrame(() => {
            this.drawAudioFrequence();
        });
    }

    drawAudio() {
      // On réinitialise le graph
      this.audioCanvasContext.clearRect(
            0,
            0,
            this.audioCanvas.width,
            this.audioCanvas.height
        );

        this.audioCanvasContext.beginPath();

        this.analyserNode.getByteTimeDomainData(this.dataTable);

        this.audioCanvasContext.fillStyle = "white";
        this.audioCanvasContext.fillRect(
            0,
            0,
            this.audioCanvas.width,
            this.audioCanvas.height
        );

        var segmentWidth = this.audioCanvas.width / this.sizeBuffer;

        var x = 0;
        for (var i = 0; i < this.sizeBuffer; i++) {
            var v = this.dataTable[i] / 255;
            var y = v * this.audioCanvas.height;

            if (i === 0) {
                this.audioCanvasContext.moveTo(x, y);
            } else {
                this.audioCanvasContext.lineTo(x, y);
            }

            x += segmentWidth;
        }

        this.audioCanvasContext.strokeStyle = "purple";
        this.audioCanvasContext.stroke();

        requestAnimationFrame(() => {
            this.drawAudio();
        });
    }

    drawVolume() {
      // On réinitialise le graph
      this.volumeCanvasContext.clearRect(
            0,
            0,
            this.volumeCanvas.width,
            this.volumeCanvas.height
        );
        this.volumeCanvasContext.save();

        this.volumeCanvasContext.fillStyle = "white";
        this.volumeCanvasContext.fillRect(
            0,
            0,
            this.volumeCanvas.width,
            this.volumeCanvas.height
        );

        this.volumeCanvasContext.fillStyle = this.gradient;

        this.analyserLeft.getByteFrequencyData(this.dataTableLeft);
        var averageLeft = this.getAverageVolume(this.dataTableLeft);
        const sizeHR =
            this.volumeCanvas.height < averageLeft ?
                0 :
                this.volumeCanvas.height - averageLeft;

        this.volumeCanvasContext.fillRect(0, sizeHR, 25, this.volumeCanvas.height);

        this.analyserRight.getByteFrequencyData(this.dataTableRight);
        var averageRight = this.getAverageVolume(this.dataTableRight);
        const sizeHL =
            this.volumeCanvas.height < averageRight ?
                0 :
                this.volumeCanvas.height - averageRight;
        this.volumeCanvasContext.fillRect(26, sizeHL, 25, this.volumeCanvas.height);

        this.volumeCanvasContext.restore();

        requestAnimationFrame(() => {
            this.drawVolume();
        });
    }

    getAverageVolume(array) {
        var values = 0;
        var average;
        var length = array.length;

        for (var i = 0; i < length; i++) {
            values += array[i];
        }
        average = values / length;
        return average;
    }
}

customElements.define("my-music-player", myMusicPlayer);