using BusReservationNET.DTO;
using BusReservationNET.Models;
using BusReservationNET.Repositories;
using Microsoft.AspNetCore.Identity;

namespace BusReservationNET.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository userRepository, IPasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<User> AddAgentAsync(User user)
        {
            user.Role = Role.ROLE_AGENT.ToString();
            return await _userRepository.AddAgentAsync(user);
        }

        public async Task<IEnumerable<User>> GetAllAgentsAsync()
        {
            return await _userRepository.GetAllAgentsAsync();
        }

        public async Task<User> RegisterUserAsync(UserDTO dto)
        {
            var user = new User
            {
                Name = dto.Username,
                Address = dto.Address,
                Email = dto.Email,
                Contact = dto.Contact,
                Role = Role.ROLE_CUSTOMER.ToString(),

            };

            user.Password = _passwordHasher.HashPassword(user, dto.Password);

            return await _userRepository.AddUserAsync(user);
        }

        public async Task<User> UpdateUserAsync(long id, EditUserDTO dto)
        {
            var user = new User
            {
                Name = dto.Username,
                Address = dto.Address,
                Email = dto.Email,
                Contact = dto.Contact,
                
                Role =  Role.ROLE_CUSTOMER.ToString(),
            };

            return await _userRepository.UpdateUserAsync(id, user);
        }

        public async Task<List<User>> GetAllCustomersAsync()
        {
            return await _userRepository.GetAllCustomersAsync();
        }

        public async Task<User> GetUserByIdAsync(long id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<User?> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null )
            {
                    return null; 

            }

            Console.WriteLine($"Email: {email}");
            Console.WriteLine($"User from DB: {user?.Email}");
            Console.WriteLine($"Stored Hash: {user?.Password}");
            Console.WriteLine($"Entered password: {password}");

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            Console.WriteLine($"Verify result: {result}");

            return result == PasswordVerificationResult.Success ? user : null;
        }

    }
}

