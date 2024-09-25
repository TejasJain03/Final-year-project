import { useSearchParams } from 'react-router-dom';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan'); // Extract 'plan' from the URL query string

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Selected Plan: {plan}</p>
    </div>
  );
}


export default PaymentPage;