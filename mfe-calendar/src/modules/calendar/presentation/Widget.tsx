import { Button } from 'siesa-ui-kit';

export const Widget = () => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Calendar Widget</h2>
      <Button variant="primary" onClick={() => console.log('Calendar Clicked')}>
        Open Calendar
      </Button>
    </div>
  );
};

export default Widget;
