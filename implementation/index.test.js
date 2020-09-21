class Promise {

  constructor(action) {
    // this.state = 'pending'
    this.action = action;
    // this.action(function(value) {
    //   if(value){
    //     this.value = value
    //   } else {
    //     return 'function must resolve with value';
    //   }
    // }), function(error){
    //   if(error){
    //     this.error = error
    //   } else {
    //     return 'must reject with an eror';
    //   }
    // } 
  }

  then(sucsessFunction) {
    this.sucsessFunc = (val) => {
      const data = sucsessFunction(val)
      return new Promise.resolve((data));
    }
  }

  resolve(data) {
    this.sucsessFunc(data)
    // this.state = 'fullfield' 
    this.action(this.resolve, this.reject);
  }

  static resolve(config) {
    return new Promise((resolve) => {
      try {
        resolve(config)
      } catch (error) {
        this.reject(error);
      }
    })
  }

  catch(failiureFunc) {
    this.failiureFunc = failiureFunc
  }

  reject(error) {
    this.failiureFunc(error)
    // this.state = 'rejected'
    this.action(this.resolve, this.reject)
  }

}


describe('Promise <constructor>', () => {
  test('resolves like a promise', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 30);
    }).then((val) => {
      expect(val).toBe(1);
    });
  });

  test('is always asynchronous', () => {
    const p = new Promise((resolve) => resolve(5));

    expect((p).value).not.toBe(5);
  });

  test('our test', () => {
    const p = new Promise((resolve) => resolve(console.log('--------------------5---------------------'))).then();

    // expect((p).value).not.toBe(5);
  });

  test('resolves with the expected value', () => {
    return new Promise((resolve) => resolve(30)).then((val) => {
      expect(val).toBe(30);
    });
  });

  test('resolves a thenable before calling then', () => {
    return new Promise((resolve) =>
      resolve(new Promise((resolve) => resolve(30))),
    ).then((val) => expect(val).toBe(30));
  });

  test('catches errors (reject)', () => {
    const error = new Error('Hello there');

    return new Promise((resolve, reject) => {
      return reject(error);
    }).catch((err) => {
      expect(err).toBe(error);
    });
  });

  test('catches errors (throw)', () => {
    const error = new Error('General Kenobi!');

    return new Promise(() => {
      throw error;
    }).catch((err) => {
      expect(err).toBe(error);
    });
  });

  test('is not mutable - then returns a new promise', () => {
    const start = new Promise((resolve) => resolve(20));
    return Promise.all([
      start
        .then((val) => {
          expect(val).toBe(20);
          return 30;
        })
        .then((val) => expect(val).toBe(30)),
      start.then((val) => expect(val).toBe(20)),
    ]);
  });
});