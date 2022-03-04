# Liskov Substitute Principle (LSP)

if any function takes a base class as its argument then it should take any derived class of that base class without breaking the function. suppose `Rectangle` is a base class `Square` is a derived class of `Rectangle`. Lets create a class called `Building` which takes any object of `Rectangle` in its constructor and does some work with it. Then `Building` class should be able to take in `Square` class in its `constructor` without breaking any functionality of `Building` class.
