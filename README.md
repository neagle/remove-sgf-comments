# Strip Comments

Strip comments from SGF files in a directory, recursively. This is a bare-bones script that assumes valid SGF files and doesn't do anything more sophisticated than write over the existing SGF files--please keep a backup directory of the original files!

This requires NodeJS.

## Usage:

```js
$ node i
$ node index.js --dir=<somedir>
```

## Example:

You can use this just to make sure the script is working on your system.

```js
$ node index.js --dir=example/example-sgfs
```

This should strip out all the comments in all the SGF files in the example-sgfs directory.
