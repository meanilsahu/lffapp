import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';

export const CreditcardUtils = (cardno, cardtype) => {
  const cardtypes = [
    {
      name: 'Visa',
      length: '13,16',
      prefixes: '4,4001',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'MasterCard',
      length: '16',
      prefixes: '50,51,52,53,54,55,2222',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'DinersClub',
      length: '14,16',
      prefixes: '36,38,54,55',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'CarteBlanche',
      length: '14',
      prefixes: '300,301,302,303,304,305',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'AmEx',
      length: '15',
      prefixes: '34,37',
      checkdigit: true,
      cardcodeName: 'CID',
      cardcodesize: '4',
    },
    {
      name: 'Discover',
      length: '16',
      prefixes: '6011,622,64,65',
      checkdigit: true,
      cardcodeName: 'CID',
      cardcodesize: '3',
    },
    {
      name: 'JCB',
      length: '16',
      prefixes: '35',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'enRoute',
      length: '15',
      prefixes: '2014,2149',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'Solo',
      length: '16,18,19',
      prefixes: '6334,6767',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'Switch',
      length: '16,18,19',
      prefixes: '4903,4905,4911,4936,564182,633110,6333,6759',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'Maestro',
      length: '12,13,14,15,16,18,19',
      prefixes: '5018,5020,5038,6304,6759,6761,6762,6763,5612,5893',
      checkdigit: true,
      cardcodeName: 'CVC',
      cardcodesize: '3',
    },
    {
      name: 'VisaElectron',
      length: '16',
      prefixes: '4026,417500,4508,4844,4913,4917',
      checkdigit: true,
      cardcodeName: 'CVV',
      cardcodesize: '3',
    },
    {
      name: 'LaserCard',
      length: '16,17,18,19',
      prefixes: '6304,6706,6771,6709',
      checkdigit: true,
    },
    {
      name: 'Hipercard',
      length: '13,16,19',
      prefixes: '38,60',
      checkdigit: true,
      cardcodeName: 'CVC',
      cardcodesize: '4',
    },
    {
      name: 'Elo',
      length: '13,16,19',
      prefixes:
        '401178, 401179, 431274, 438935, 451416, 457393, 457631, 457632, 504175, 627780,636297, 636368, 636369',
      checkdigit: true,
      cardcodeName: 'CVE',
      cardcodesize: '3',
    },
  ];

  const cleanCardNo = cardno.replace(/\s/g, '');

  cardtypes.forEach(type => {
    if (type && type.name && type.name == cardtype) {
      let prefix = type.prefixes.split(',');
      for (i = 0; i < prefix.length; i++) {
        var exp = new RegExp('^' + prefix[i]);
        if (exp.test(cleanCardNo)) {
          let lengths = type.length.split(',');
          for (j = 0; j < lengths.length; j++) {
            if (cleanCardNo.length == lengths[j]) {
            } else {
            }
          }
        } else {
          {
            
          }
        }
      }
    }
  });
};
