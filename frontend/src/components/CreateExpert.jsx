import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../services/Api';
import { useNavigate } from 'react-router-dom';

const CreateExpertForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    description: '',
    prompt: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create an expert.');
      return;
    }

    if (!formData.image) {
      setError('Please upload an image for your expert.');
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) submitData.append(key, formData[key]);
    });
    submitData.append('user_id', user.id);

    try {
      const response = await api.post('accounts/myexperts/', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Expert created:', response.data);
      setShowConfirmation(true);
      setTimeout(() => {
        navigate('/myexperts');
      }, 2000); // Navigate after 2 seconds
    } catch (err) {
      console.error('Error creating expert:', err);
      setError('Failed to create expert.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const inputClasses = "bg-[#3B3B3B] text-[#F1EFE7] border-2 border-[#F1EFE7] p-3 w-full rounded-lg focus:outline-none focus:border-[#F1EFE7] transition-all duration-300";
  const labelClasses = "block text-[#F1EFE7] text-lg font-medium mb-2";

  const renderStep = () => {
    const stepVariants = {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 }
    };

    switch(step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <label className={labelClasses} htmlFor="name">What's your expert's name?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. Dr. AI Smith"
              required
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <label className={labelClasses} htmlFor="field">What's their field of expertise?</label>
            <input
              type="text"
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. Quantum Physics"
              required
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <label className={labelClasses} htmlFor="description">Describe your expert:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClasses} h-40`}
              placeholder="Tell us about your expert's background and expertise..."
              required
            ></textarea>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <label className={labelClasses} htmlFor="prompt">Enter a prompt for your expert:</label>
            <textarea
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              className={`${inputClasses} h-40`}
              placeholder="Enter specific instructions or information about how your AI expert should respond..."
              required
            ></textarea>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <label className={labelClasses} htmlFor="image">Upload an image for your expert:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F1EFE7] file:text-[#3B3B3B] hover:file:bg-[#E1DFD7]`}
              required
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] py-8 px-4 sm:px-6 lg:px-8 flex items-start justify-center">
      <motion.div 
        className="w-full max-w-lg bg-[#3B3B3B] p-10 rounded-xl shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className="absolute inset-0 bg-[#3B3B3B] flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.svg
                  className="w-20 h-20 mx-auto text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <path d="M5 13l4 4L19 7"></path>
                </motion.svg>
                <motion.p
                  className="mt-4 text-xl font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  Expert Created Successfully!
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="text-4xl font-bold mb-8 text-center">Create Your AI Expert</h2>
        {error && <motion.div 
          className="text-red-500 mb-6 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >{error}</motion.div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode='wait'>
            {renderStep()}
          </AnimatePresence>
          <div className="mt-10 flex justify-between">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={prevStep}
                className="bg-[#F1EFE7] text-[#3B3B3B] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
            )}
            {step < 5 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="bg-[#F1EFE7] text-[#3B3B3B] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={loading || !formData.image}
                className={`bg-[#F1EFE7] text-[#3B3B3B] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 ${(loading || !formData.image) ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? 'Creating...' : 'Create Expert'}
              </motion.button>
            )}
          </div>
        </form>
        <div className="mt-8 flex justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full mx-2 ${i <= step ? 'bg-[#F1EFE7]' : 'bg-[#5B5B5B]'}`}
              initial={false}
              animate={{ scale: i === step ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CreateExpertForm;
