<template>
    <div oncopy="return false" oncut="return false" onpaste="return false">
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#" variant="light">
          <strong>BALAPAN NGETIK</strong>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto"></b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <Countdown/>
      <p>Anda bisa bermain game</p>
      <button @click.prevent="playNow()">play</button>
      <button @click.prevent="finishPlay()">finish</button>
      <b-container class="mt-5" v-if="!startCountdown">
        <b-container class="gamecontainer">
          <b-row class="my-5">
            <div class="paragraph" v-html="outputHTML"></div>
            <div class="typer">
              <textarea
                autofocus="autofocus"
                v-model="typing"
                placeholder="start typing here"
                @keydown="prevent"
              ></textarea>
              <div
                v-if="typoIndex != -1"
                class="alert alert-danger alert-dismissible fade show"
              >WRONG TYPING!</div>
            </div>
            <h4>{{ wpm.toFixed(0) }} WPM</h4>
          </b-row>
        </b-container>
      </b-container>
    </div>
</template>

<script>
import { db, increment } from "../api/firebase";
import { access } from "fs";
const firebase = require("firebase/app");
const dbtest = db.collection("tesuji");
const dbtestplay = db.collection("testplay");
const wpmdata = db.collection("wpmdata");
import { mapState, mapMutations } from "vuex";
import Countdown from '@/components/Countdown'

export default {
  name: "Game",
  data() {
    return {
      typing: "",
      typoIndex: -1,
      correctWord: -1,
      wpm: 0,
      started: Date.now()
    };
  },
  components : {
    Countdown
  },
  methods: {
    playNow() {
      console.log("tombol play di click");
      dbtestplay.doc("bvHKUAFUhEW3RjzHsyTd").update({ play: true })
      .then(_=>{
        this.playStart()
      });
      
    },
    finishPlay() {
      console.log("Permainan selesai");
      dbtestplay
        .doc("bvHKUAFUhEW3RjzHsyTd")
        .update({ play: false })
        .then(() => {
          return dbtest.doc("fXrCkZeVk1MzCvd7Dg2A").update({ counter: 0 });
        })
        .then(() => {
          return wpmdata.doc("kR4Iem0Ow2SLhz1GWqBm").update({
            wpm: firebase.firestore.FieldValue.arrayUnion(this.wpm) // Masukkan angka dengan jumla
          });
        })
        .then(() => {
          this.playEnd()
          console.log("update selesai");
        })
        .catch(err => {
          console.log("data");
          console.log(err);
        });
    },
    prevent: function(e) {
      this.correctWord++;
      if (this.typing.length !== 0) {
        const index = this.typing.length - 1;
        if (this.typing[index] !== this.text[index] && e.key !== "Backspace") {
          e.preventDefault();
        } else {
          if (
            this.typing[index] === this.text[index] &&
            e.key === "Backspace"
          ) {
            e.preventDefault();
          }
        }
      }
    },
    ...mapMutations(["playStart", "playEnd"])
  },
  computed: {
    outputHTML: function() {
      let newHTML = '<span class="correct">';
      if (this.typoIndex === -1) {
        // we do not have a typo index
        newHTML += this.text.substr(0, this.typing.length);
        newHTML += "</span>";
        newHTML += this.text.substr(this.typing.length);

        return newHTML;
      }
      // else we have a typo index
      newHTML += this.text.substr(0, this.typoIndex);
      newHTML += "</span>";
      newHTML += '<span class="typo">';
      newHTML += this.text.substring(this.typoIndex, this.typing.length);
      newHTML += "</span>";
      newHTML += this.text.substr(this.typing.length);

      return newHTML;
    },
    ...mapState(["text", "play", "startCountdown", "gameCountdown"])
  },
  watch: {
    typing(value) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== this.text[i]) {
          this.typoIndex = i;
          break;
        }
        this.typoIndex = -1;
      }
      console.log(value);
      this.wpm = this.correctWord / 5 / ((Date.now() - this.started) / 60000);
      console.log(this.wpm);
    }
  },
  created: function() {
    console.log(this.$store.state.username)
  }
};
</script>

<style>
.gamecontainer {
  max-width: 700px;
  font-size: 22px;
  text-align: left;
}
.paragraph {
  margin-bottom: 50px;
}
textarea {
  width: 100%;
  background: transparent;
}
.typer {
  width: 100%;
}
.correct {
  color: rgb(63, 81, 181);
  font-size: 22px;
}
.typo {
  color: #f00;
  font-size: 23px;
}
</style>