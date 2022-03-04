# OpenClosedPrinciple (OCP)

> classes are open for extension (inheritance or composition), closed for modification

## Problem

Suppose we have a e-commerce website and we sell lots of items. And we let user to filter our products by color initially. so we create a common product class and a separate ProductFilter class to filter them.

```javascript
class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((product) => product.color === color);
  }
}
```

Nice, we shipped our code and customer is happy. Now after few days customer wants to filter by size. It's easy...

```javascript
class ProductFilter {
  filterByColor(products, color) {
    return products.filter((product) => product.color === color);
  }

  filterBySize(products, size) {
    return products.filter((product) => product.size === size);
  }
}
```

after few days they wanna search by both color and size.

```javascript
class ProductFilter {
  filterByColor(products, color) {
    return products.filter((product) => product.color === color);
  }

  filterBySize(products, size) {
    return products.filter((product) => product.size === size);
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter(
      (product) => product.size === size && product.color === color
    );
  }
}
```

they are so happy that now they want products which matches any one of the criteria.

```javascript
class ProductFilter {
  ...
  filterBySizeAndColor(products, size, color) {
   return products.filter(product => product.size === size && product.color === color)
 }

 filterBySizeOrColor(products, size, color) {
   return products.filter(product => product.size === size || product.color === color)
 }
}
```

now, what we just did is called modification not extension. Also we created another problem called `state space explosion`. for 3 criteria we have to write 7 method. There is noway we are going to write and maintain 7 different method just to filter.

## solution

> Specification pattern comes to rescue. Specification pattern means we should create separate class for each kind of filter specification. and each class will have a `isSatisfied()` method in it. And we will have a `SpecificationFilter` class which will use these specification to filter products.

```javascript
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class SpecificationFilter {
  filter(items, spec) {
    return items.filter((item) => spec.isSatisfied(item));
  }
}
```

now we can use SpecificationFilter to filter products by any specification like size or color.

```javascript
const color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

const size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

const apple = new Product("apple", Color.blue, Size.small);
const table = new Product("table", Color.green, Size.medium);
const keyboard = new Product("keyboard", Color.red, Size.small);

const products = [apple, table, keyboard];
const redSpec = new ColorSpecification(Color.red);
const specFilter = new SpecificationFilter();
const redProducts = specFilter.filter(products, redSpec);
```

now we have all red products. if in future we want to introduce new filter type we don't have to modify any previous class, we just have to extend the functionality by introducing new class. Now you are assuming how to do `AND or ||` operations on multiple filters. For that we have to create `AndSpecification` and `OrSpecificationFilter` filter.

```javascript
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    this.specs.every((spec) => spec.isSatisfied(item));
  }
}

class OrSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    this.specs.some((spec) => spec.isSatisfied(item));
  }
}

const redSpec = new ColorSpecification(Color.red);
const smallSpec = new SizeSpecification(Size.small);
const redAndSmallSpec = new AndSpecification(redSpec, smallSpec);
const redOrSmallSpec = new OrSpecification(redSpec, smallSpec);
const specFilter = new SpecificationFilter();
const redAndSmallProducts = specFilter.filter(products, redAndSmallSpec);
const redOrSmallProducts = specFilter.filter(products, redOrSmallSpec);
```

now we can create different type of combinator like `xor` or `xnor`. typecially in other language we can create a `Specification` abstract class which has a abstract method `isSatisfied(item)` and different specification will `extends` it.
