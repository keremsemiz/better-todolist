# easytask

This website/tool is one of the easiest ways to keep track of your work and chores!
![Demo](https://github.com/user-attachments/assets/f3af0552-81e9-420f-8ddf-18548faa9067)

Currently, two official versions are available:
- The mobile Fast Refresh with [Babel](https://babeljs.io/)

- The web-based stable with [SWC](https://swc.rs/) for Fast Refresh
![Demo1](https://github.com/user-attachments/assets/94b60803-9a6a-4fd3-ac74-840fb3cc88e6)

## Utilising the application

If you are utilising EasyTask for your daily tasks we recommend you configure the Send Usage Statistics Option

- Configure the top-level `usageStatistic` property like this:

```typescript
export default {
  // other TSX
  <div className="menuItem">
      Send usage statistics?
    <input type="checkbox" name="toggleUsageStatistics" id="" />
  </div>
}
```

- Before use, make sure to try out the deployed versions for testing purposes:
https://wondrous-pika-38aa90.netlify.app/
