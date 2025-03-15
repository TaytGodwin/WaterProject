import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-2">Last updated: March 15, 2025</p>
      <p className="text-gray-700 mb-6">
        We value your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, and share
        information when you use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Information you provide to us directly.</li>
        <li>
          Automatically collected data through cookies and tracking
          technologies.
        </li>
        <li>Information from third-party sources.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        How We Use Your Information
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>To provide, operate, and improve our services.</li>
        <li>To personalize your experience and offer relevant content.</li>
        <li>To communicate with you regarding updates and promotions.</li>
        <li>To comply with legal obligations and prevent fraud.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Cookies and Tracking Technologies
      </h2>
      <p className="text-gray-700 mb-6">
        We use cookies and similar technologies to enhance your experience. You
        can manage your cookie preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Sharing Your Information
      </h2>
      <p className="text-gray-700 mb-6">
        We do not sell your personal information. We may share information with
        service providers, business partners, or legal authorities when
        necessary.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Security Measures</h2>
      <p className="text-gray-700 mb-6">
        We implement security measures to protect your data from unauthorized
        access, loss, or misuse. However, no system is completely secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Your Choices and Rights
      </h2>
      <p className="text-gray-700 mb-6">
        You can update your preferences, request data access, or opt-out of
        certain communications. For more information, contact us.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p className="text-gray-700 mb-6">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated revision date.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="text-gray-700 mb-6">
        If you have any questions about this Privacy Policy, please contact us
        at
        <a href="mailto:privacy@example.com" className="text-blue-600">
          {' '}
          privacy@example.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
