# easytask

This website/tool is one of the easiest ways to keep track of your work and chores!

Currently, two official versions are available:

- The mobile Fast Refresh with [Babel](https://babeljs.io/)

- The web-based stable with [SWC](https://swc.rs/) for Fast Refresh

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

- Before use, make sure to try out the deployed versions for testing purposes
