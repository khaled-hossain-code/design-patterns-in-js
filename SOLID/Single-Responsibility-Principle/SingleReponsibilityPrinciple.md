# Single Responsibility Principle (SRP)

> your class should have only **one** responsiblity

> your class should have only **one** reason to change.

Problem:-
Suppose you want to create a journal app. so let's build a journal class which add and remove journal from our system.

```javascript
class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let count = ++Journal.count;
    let entry = "${count}: ${{text}"; // please use backtick
    this.entries[count];
    return count;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).joint("\n");
  }
}

Journal.count = 0;

let journal = new Journal();
journal.addEntry("Lorem Ipsum1");
journal.addEntry("Lorem Ipsum2");

console.log(journal.toString());
```

Everything is fine but now new requirement came. User wants to persists their journal. so we need to save the journal to file system. Now we are tempted to add small code inside `Journal` class and get it done.

```javascript
import fs from 'fs';

class Journal {
  ...
  save(filename){
    fs.writeFileSync(filename, this.toString());
  }
}
```

it's easy but we need to load from the file system too.

```javascript
class Journal {
  ...
  load(filename){
    return fs.readFileSync(filename);
  }
}
```

now we became popular and we purchased amazon database. also we load journal from url. now two more method is going to be added to `Journal` class.

```javascript
class Journal {
  ...
  loadFromDB(filename){
    ...
  }

  loadFromUrl(filename){

  }
}
```

Now we have added 2 responsibility to our `Journal` class.

1. Adding & removing journal
1. Persist journal

Suppose we need to remove indices before saving and add indices after loading, all these things need to be done inside `Journal` class.
Now we start to sell books. We store books to file system and database too. Now see as the requirement changes we have to do all the loading and saving again in `Book` class.

## solution

So saving journal or book should be handled by a general persistance manager.

```javascript
class PersistenceManager {
  preProcess(journal) {
    ...
  }
  saveToFile(journal, filename) {
    const processedJournal = preProcess(journal)
    fs.writeFileSync(filename, processedJournal)
  }
}

let persistance = new PersistanceManager();
let filename = 'file1';
persistance.saveToFile(journal, filename);
```

mainly we are keeping preprocessing and saving local to one another. Now Book & Journal, Magazine anything can be saved using this manager.Now we have one reason to change each class

1. Journal Class - if we are unable to add/remove journal then look into this class
1. PersistanceManager Class - if we are having problem to save to file system or retrieve from file system then look into this class.

so takeaway is each responsibility should have separate class. anti-pattern is take a type like Journal and build all functionality related to that type in one class.
