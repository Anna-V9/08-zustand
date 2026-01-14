'use client';

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return (
    <p>
      Could not fetch filtered notes. {error.message}
    </p>
  );
}