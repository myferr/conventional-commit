#!/usr/bin/env bash

set -e
clear
TARGET_DIR=~/conventional-commit

if [ -d "$TARGET_DIR" ]; then
    echo "Error: $TARGET_DIR already exists."
    exit 1
fi

mkdir -p "$TARGET_DIR"

git clone https://github.com/myferr/conventional-commit temp-conventional-commit

mv temp-conventional-commit/* temp-conventional-commit/.[!.]* "$TARGET_DIR" 2>/dev/null || true
rmdir temp-conventional-commit

read -p "What is your configuration file? [.zshrc / .bashrc]: " config_file
echo "You entered: $config_file"

echo "alias cc='node ~/conventional-commit/src/index.js \$1 \$2'" >> ~/"$config_file"
echo "Alias 'cc' added to ~/$config_file. Please restart your shell or run 'source ~/$config_file' to use it."

read -p "Enter your Gemini API key: " geminikey
echo "export const GEMINI_API_KEY = \"$geminikey\"" > ~/conventional-commit/key.js
echo "Gemini API key saved to ~/conventional-commit/key.js"

(cd ~/conventional-commit && npm install)