// import crypto from "crypto-browserify";
import { Buffer } from "buffer";
const { VITE_RSA_PUBLIC_LAMBDA_PROFILE } = import.meta.env;

export const onlyText = (event, value) => {
    // eslint-disable-next-line
    const regular = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
    const regex = new RegExp(regular);
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key) || (value[0] === undefined && /^\s/.test(key))) {
      event.preventDefault();
      return;
    }
    // eslint-disable-next-line consistent-return
    return true;
  };

  // eslint-disable-next-line consistent-return
export const onlyNumber = (event) => {
  event = event || window.event;
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    event.preventDefault();
  } else {
    return true;
  }
};

export const alphaNumeric = (event) => {
  const char = String.fromCharCode(event.which || event.keyCode);
  if (!/^[a-zA-Z0-9]+$/.test(char)) {
    event.preventDefault();
  }
};

function pemToArrayBuffer(pem) {
  // Remove PEM header and footer
  const pemHeader = '-----BEGIN PUBLIC KEY-----'
  const pemFooter = '-----END PUBLIC KEY-----'
  const encoded = pem.substring(pemHeader.length, pem.length - pemFooter.length - 1)
  // Decode Base64 to binary
  const binaryString = atob(encoded)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}
async function importRSAPublicKey(pem) {
  const arrayBuffer = pemToArrayBuffer(pem)
  return await crypto.subtle.importKey(
    'spki', // Format
    arrayBuffer,
    {
      name: 'RSA-OAEP', // Algorithm with PKCS#1 v1.5 padding
      hash: { name: 'SHA-256' } // Hash algorithm
    },
    true, // Extractable
    ['encrypt'] // Key usage
  )
}

export async function encryptData(data) {
  const publicKey = await importRSAPublicKey(VITE_RSA_PUBLIC_LAMBDA_PROFILE)
  const encoder = new TextEncoder()
  const encodedData = encoder.encode(data)
  try {
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP'
      },
      publicKey,
      encodedData
    )
    return new Uint8Array(encryptedData)
  } catch (error) {
    console.log(error)
  }
  return null
}


export const secureEmail = (email) => {
  if (!email) return "";
  const [username, domain] = email.split("@");
  const secure = username
    .split("")
    .map((char, i, arr) => {
      if (i < 2 || i > arr.length - 2) return char;
      return "*";
    })
    .join("");
  return `${secure}@${domain}`;
};

export const securePhone = (phone) => {
  const str = phone.toString()
  const secure = str
    .split("")
    .map((char, i, arr) => {
      if (i < 1 || i > arr.length - 3) return char;
      return "*";
    })
    .join("");
  return `${secure}`;
};