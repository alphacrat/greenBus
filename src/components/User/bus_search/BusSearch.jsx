import styled from 'styled-components'
import CustomButton from '../../utils/Button.jsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import axiosInstance from '../../../../utils/axios.js'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import BusList from '../busList/BusList.jsx'

const Container = styled.div`
  background-color: #adbc9f;

  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  bottom: 3rem;
`

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 16px;
  border: 1px solid #ccc;
  font-size: 16px;
`
const SearchSchema = z.object({
  source: z.string().min(1, 'source is required'),
  destination: z.string().min(1, 'destination is required'),
  date: z.string().min(1, 'date is required'),
})

const BusSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(SearchSchema),
  })

  const formData = watch()

  const { mutate, isPending, data, error } = useMutation({
    mutationKey: ['bus'],
    mutationFn: async (data) => {
      const res = await axiosInstance.post('/bus/search', data)
      return res.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error.response.data)
      } else {
        toast.error('Oops something wrong')
      }
    },
  })

  return (
    <div className="search-bus-container">
      <Container>
        <h2 className="mb-3" style={{ color: '#12372A' }}>
          Search Buses
        </h2>
        <form onSubmit={handleSubmit(mutate)}>
          <div className="d-flex flex-column align-items-center searchFormStyle">
            <Input
              className="mb-3 "
              type="text"
              placeholder="Enter Source"
              {...register('source')}
            />

            {errors.source && (
              <p className="error-message">{errors.source.message}</p>
            )}
            <Input
              className="mb-3"
              type="text"
              placeholder="Enter Destination"
              {...register('destination')}
            />

            {errors.destination && (
              <p className="error-message">{errors.destination.message}</p>
            )}
            <Input className="mb-3" type="date" {...register('date')} />
            {errors.date && (
              <p className="error-message">{errors.date.message}</p>
            )}
          </div>
          <CustomButton className="mb-3 bus-search-button" type="submit">
            Search
          </CustomButton>
        </form>
        {isPending && <h3>Loading...</h3>}
        {error && error instanceof AxiosError && (
          <h3>{error?.response?.data?.message}</h3>
        )}
        {data && data.data.buses.length > 0 && (
          <BusList buses={data.data.buses} formData={formData} />
        )}
      </Container>
    </div>
  )
}

export default BusSearch
