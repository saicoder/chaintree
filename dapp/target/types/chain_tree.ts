export type ChainTree = {
  "version": "0.1.0",
  "name": "chain_tree",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "metadataUrl",
          "type": "string"
        },
        {
          "name": "metadataHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "updateProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadataUrl",
          "type": "string"
        },
        {
          "name": "metadataHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "metadataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "metadataUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UsernameTooLarge",
      "msg": "Username too large"
    },
    {
      "code": 6001,
      "name": "UsernameTooSmall",
      "msg": "Username too small"
    },
    {
      "code": 6002,
      "name": "UsernameInvalidFormat",
      "msg": "Username can only contain lowercase letters and numbers"
    },
    {
      "code": 6003,
      "name": "MetadataTooLarge",
      "msg": "Metadata too large"
    }
  ]
};

export const IDL: ChainTree = {
  "version": "0.1.0",
  "name": "chain_tree",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "metadataUrl",
          "type": "string"
        },
        {
          "name": "metadataHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "updateProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadataUrl",
          "type": "string"
        },
        {
          "name": "metadataHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "metadataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "metadataUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UsernameTooLarge",
      "msg": "Username too large"
    },
    {
      "code": 6001,
      "name": "UsernameTooSmall",
      "msg": "Username too small"
    },
    {
      "code": 6002,
      "name": "UsernameInvalidFormat",
      "msg": "Username can only contain lowercase letters and numbers"
    },
    {
      "code": 6003,
      "name": "MetadataTooLarge",
      "msg": "Metadata too large"
    }
  ]
};
