<template>
    <div class="twoStepVerify__code">
      <input
        @input="handleCodeInput($event)"
        @copy.prevent
        @paste="handlePasteCode($event)"
        @focus="$event.target.select()"
        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
        name="code0"
        type="tel"
        maxLength="1"
        autoComplete="off"
        :style="`border: ${!errorOtp ? '1px solid #68727C' : '1px solid #BA1A1A'}`"
        tabIndex="0"
        data-uia="pin-number-0"
        aria-label="Entrada de PIN 1."
        :value="code0"
      />
      <input
        @input="handleCodeInput($event)"
        @copy.prevent
        @paste="handlePasteCode($event)"
        @focus="$event.target.select()"
        @keyup="handleKeyUp($event)"
        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
        name="code1"
        type="tel"
        maxLength="1"
        autoComplete="off"
        :style="`border: ${!errorOtp ? '1px solid #68727C' : '1px solid #BA1A1A'}`"
        tabIndex="0"
        data-uia="pin-number-1"
        aria-label="Entrada de PIN 2."
        :value="code1"
      />
      <input
        @input="handleCodeInput($event)"
        @copy.prevent
        @paste="handlePasteCode($event)"
        @focus="$event.target.select()"
        @keyup="handleKeyUp($event)"
        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
        name="code2"
        type="tel"
        maxLength="1"
        autoComplete="off"
        :style="`border: ${!errorOtp ? '1px solid #68727C' : '1px solid #BA1A1A'}`"
        tabIndex="0"
        data-uia="pin-number-2"
        aria-label="Entrada de PIN 3."
        :value="code2"
      />
      <input
        @input="handleCodeInput($event)"
        @copy.prevent
        @paste="handlePasteCode($event)"
        @focus="$event.target.select()"
        @keyup="handleKeyUp($event)"
        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
        name="code3"
        type="tel"
        maxLength="1"
        autoComplete="off"
        :style="`border: ${!errorOtp ? '1px solid #68727C' : '1px solid #BA1A1A'}`"
        tabIndex="0"
        data-uia="pin-number-3"
        aria-label="Entrada de PIN 4."
        :value="code3"
      />
      <input
        @input="handleCodeInput($event)"
        @copy.prevent
        @paste="handlePasteCode($event)"
        @focus="$event.target.select()"
        @keyup="handleKeyUp($event)"
        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
        name="code4"
        type="tel"
        maxLength="1"
        autoComplete="off"
        :style="`border: ${!errorOtp ? '1px solid #68727C' : '1px solid #BA1A1A'}`"
        tabIndex="0"
        data-uia="pin-number-4"
        aria-label="Entrada de PIN 5."
        :value="code4"
      />
      <input
        @input="handleCodeInput($event)"
        @copy.prevent
        @paste="handlePasteCode($event)"
        @focus="$event.target.select()"
        @keyup="handleKeyUp($event)"
        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
        name="code5"
        type="tel"
        maxLength="1"
        autoComplete="off"
        :style="`border: ${!errorOtp ? '1px solid #68727C' : '1px solid #BA1A1A'}`"
        tabIndex="0"
        data-uia="pin-number-5"
        aria-label="Entrada de PIN 6."
        :value="code5"
      />
    </div>
  </template>

  <script>
  export default {
    props: {
      errorOtp: {
        type: Boolean,
        default: false,
      },
      code: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        code0: "",
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
      };
    },
    watch: {
      code() {
        this.code0 = this.code[0] || '';
        this.code1 = this.code[1] || '';
        this.code2 = this.code[2] || '';
        this.code3 = this.code[3] || '';
        this.code4 = this.code[4] || '';
        this.code5 = this.code[5] || '';
      },
    },
    methods: {
      handleKeyUp(e) {
        const { key } = e;
        if (key === "Delete" || key === "Backspace") {
          document.activeElement.previousElementSibling.focus();
        }
      },
      handlePasteCode(e) {
        const { clipboardData } = e;
        const codePasted = clipboardData.getData("text");
        const reg = new RegExp("^[0-9]$");
        for (let index = 0; index < 6; index += 1) {
          const code = codePasted[index];
          if (code && reg.test(code)) {
            this[`code${index}`] = code;
            if (index <= 4) {
              document.activeElement.nextElementSibling.focus();
            }
          } else {
            e.preventDefault();
            this[`code${index}`] = "";
          }
        }
        if (codePasted) {
          e.target.value = "";
        }
        const codes = {
          code0: this.code0,
          code1: this.code1,
          code2: this.code2,
          code3: this.code3,
          code4: this.code4,
          code5: this.code5,
        };
        this.$emit("change", Object.values(codes).join(""));
      },
      handleCodeInput(e) {
        const codes = {
          code0: this.code0,
          code1: this.code1,
          code2: this.code2,
          code3: this.code3,
          code4: this.code4,
          code5: this.code5,
        };
        const { name, value } = e.target;
        const reg = new RegExp(/^[0-9]*\.?[0-9]*$/);
        if (reg.test(value)) {
          this[name] = value;
          codes[name] = value;
          if (name !== "code5" && value !== "") {
            document.activeElement.nextElementSibling.focus();
          }
          this.$emit("change", Object.values(codes).join(""));
        } else {
          e.preventDefault();
        }
      },
    },
  }
  </script>

  <style>
    .twoStepVerify__code {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin: 15px 0;
    }
    .twoStepVerify__code input {
      max-width: 58px;
      height: 58px;
      text-align: center;
      font-family: Poppins;
      font-weight: 900;
      font-size: 24px;
      line-height: 36px;
      color: #031425;
      border-radius: 0.5rem;
      @media (max-width: 480px) {
        max-width: 45px;
        height: 45px;
      }
    }
  </style>