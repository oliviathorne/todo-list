### Instructions

#### Setup

To set up the project, clone the repository and run:

```
npm install
```

in your project directory.

#### Running locally

To run locally, start the webpack dev server with

```
npm run build
npm start
```

#### House keeping

To run the type-checker and ensure types are valid run

```
npm run flow
```

#### Worth noting

You can 'play all' and can also play from a certain point in the history by clicking that icon in the history. Clicking the 'record' icon will start/stop the recording.

#### Further notes

There are still some improvements which can be made to this.

1.  I would add unit testing in jest/enzyme. I had to prioritise time and as these weren't mentioned in the spec, I have gone through a manual test currently. Before this could be deployed, I'd expect 80% test coverage.

2.  The to do items can't be checked as 'done'. I would add functionality to mark an item as 'done' without removing it.

3.  There's a lot of information in each to do item, this could probably be reduced if 'description' wasn't necessary.

4.  Mobile is tricky as both functionalities are important to the user. I went with the to do part of the app above the fold, just since that's what the app is for.

5.  I would break out the styled-components into a more reusable set of patterns, however for the small usage in this app there is very little repetition.

6.  I would like to add some more animations, I have added a simple sliding gradient on active history items and a glow around the record button, but think sliding in the to-do items could improve the experience.

#### Contact notes

Please contact the author, Olivia Thorne, with any questions:

oliviathorne1@gmail.com
